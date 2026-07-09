/* =====================================================================
   BUKU SAKU — app logic
   Data model lives entirely in `state` (accounts, categories,
   transactions, settings) and is persisted to localStorage. The JSON
   seed baked into seed-data.js (converted from Money_Manager.xlsx) is
   used only the very first time the app runs on a browser.
   ===================================================================== */

const STORAGE_KEY = 'bukusaku_data_v1';

let state = null;

/* ---------------------------------------------------------------------
   STATE / STORAGE
   --------------------------------------------------------------------- */
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  }catch(e){ console.warn('Gagal membaca data tersimpan, memakai data awal.', e); }
  return JSON.parse(JSON.stringify(SEED_DATA));
}

function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }catch(e){
    console.error(e);
    showToast('Gagal menyimpan data (penyimpanan browser penuh?)');
  }
}

/* ---------------------------------------------------------------------
   HELPERS
   --------------------------------------------------------------------- */
function formatRupiah(n){
  const v = Math.round(n || 0);
  const sign = v < 0 ? '-' : '';
  return sign + 'Rp' + Math.abs(v).toLocaleString('id-ID');
}
function escapeHtml(s){
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function todayStr(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function monthKey(dateStr){ return dateStr.slice(0,7); }
const MONTH_NAMES_ID = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
function monthLabel(key){
  const [y,m] = key.split('-');
  return MONTH_NAMES_ID[parseInt(m,10)-1] + ' ' + y;
}
function addMonths(key, n){
  let [y,m] = key.split('-').map(Number);
  m += n;
  while(m > 12){ m -= 12; y++; }
  while(m < 1){ m += 12; y--; }
  return y + '-' + String(m).padStart(2,'0');
}
function endOfMonthStr(key){
  const [y,m] = key.split('-').map(Number);
  const last = new Date(y, m, 0).getDate();
  return key + '-' + String(last).padStart(2,'0');
}
function daysBetween(a, b){
  const da = new Date(a+'T00:00:00');
  const db = new Date(b+'T00:00:00');
  return Math.round((db - da) / 86400000);
}
function accountNames(){ return state.accounts.map(a => a.name); }
function findAccount(name){ return state.accounts.find(a => a.name === name); }

function getMonthsRange(){
  if (state.transactions.length === 0) return [monthKey(todayStr())];
  let min = null, max = null;
  state.transactions.forEach(t => {
    const mk = monthKey(t.date);
    if (min === null || mk < min) min = mk;
    if (max === null || mk > max) max = mk;
  });
  const curMonth = monthKey(todayStr());
  if (curMonth > max) max = curMonth;
  const months = [];
  let cur = min;
  let guard = 0;
  while (cur <= max && guard < 600){
    months.push(cur);
    cur = addMonths(cur, 1);
    guard++;
  }
  return months;
}

/* ---------------------------------------------------------------------
   CORE FINANCIAL CALCULATIONS
   (mirrors the formulas in the original Money_Manager.xlsx)
   --------------------------------------------------------------------- */
function computeAccountBalance(accountName, uptoDate){
  const acc = findAccount(accountName);
  if (!acc) return 0;
  let total = acc.base;
  for (const t of state.transactions){
    if (t.date > uptoDate) continue;
    if (t.account === accountName){ total += (t.income||0) - (t.expense||0); }
    if (t.transferTo === accountName){ total += (t.expense||0); }
  }
  return total;
}
function computeTotalBalance(uptoDate){
  let total = state.accounts.reduce((s,a) => s + a.base, 0);
  for (const t of state.transactions){
    if (t.date > uptoDate) continue;
    total += (t.income||0);
    if (!t.transferTo) total -= (t.expense||0);
  }
  return total;
}
function monthlyIncome(mKey){
  return state.transactions.filter(t => monthKey(t.date) === mKey).reduce((s,t) => s + (t.income||0), 0);
}
function monthlyExpense(mKey){
  return state.transactions.filter(t => monthKey(t.date) === mKey && !t.transferTo).reduce((s,t) => s + (t.expense||0), 0);
}
function computeBudgetVariance(uptoDate){
  const limit = state.settings.dailyBudgetLimit || 0;
  const sorted = state.transactions.filter(t => t.date <= uptoDate).slice().sort((a,b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
  let acc = 0, lastDay = null;
  for (const t of sorted){
    if (lastDay === null) acc += limit;
    else{
      const diff = daysBetween(lastDay, t.date);
      if (diff > 0) acc += limit * diff;
    }
    if (!t.transferTo) acc -= (t.expense||0);
    lastDay = t.date;
  }
  return acc;
}

/* ---------------------------------------------------------------------
   TOAST
   --------------------------------------------------------------------- */
let toastTimer = null;
function showToast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ---------------------------------------------------------------------
   TAB NAVIGATION
   --------------------------------------------------------------------- */
function initTabs(){
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
      if (btn.dataset.tab === 'grafik') renderCharts();
    });
  });
}

/* ---------------------------------------------------------------------
   HEADER STAMP
   --------------------------------------------------------------------- */
function renderStamp(){
  const total = computeTotalBalance(todayStr());
  document.getElementById('totalStampAmount').textContent = formatRupiah(total);
}

/* ---------------------------------------------------------------------
   FILTER DROPDOWNS (shared)
   --------------------------------------------------------------------- */
function populateDropdowns(){
  const accSel = document.getElementById('txnFilterAccount');
  const catSel = document.getElementById('txnFilterCategory');
  const fAccount = document.getElementById('fAccount');
  const fTransferTo = document.getElementById('fTransferTo');
  const fCategory = document.getElementById('fCategory');

  accSel.innerHTML = '<option value="">Semua Akun</option>' + accountNames().map(n => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
  catSel.innerHTML = '<option value="">Semua Kategori</option>' + state.categories.map(c => `<option value="${escapeHtml(c.name)}">${escapeHtml(c.name)}</option>`).join('');
  fAccount.innerHTML = accountNames().map(n => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
  fTransferTo.innerHTML = accountNames().map(n => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
  fCategory.innerHTML = state.categories.map(c => `<option value="${escapeHtml(c.name)}">${escapeHtml(c.name)}</option>`).join('');
  updateSubcategoryOptions();

  const pivotMonthSel = document.getElementById('pivotMonth');
  const months = getMonthsRange().slice().reverse();
  pivotMonthSel.innerHTML = '<option value="">Semua Waktu</option>' + months.map(m => `<option value="${m}">${monthLabel(m)}</option>`).join('');
}
function updateSubcategoryOptions(){
  const catName = document.getElementById('fCategory').value;
  const cat = state.categories.find(c => c.name === catName);
  const subSel = document.getElementById('fSubcategory');
  subSel.innerHTML = (cat ? cat.subcategories : []).map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
}

/* ---------------------------------------------------------------------
   TRANSAKSI TAB
   --------------------------------------------------------------------- */
let txnPageSize = 80;

function getFilteredTransactions(){
  const q = document.getElementById('txnSearch').value.trim().toLowerCase();
  const acc = document.getElementById('txnFilterAccount').value;
  const cat = document.getElementById('txnFilterCategory').value;
  const month = document.getElementById('txnFilterMonth').value; // YYYY-MM

  return state.transactions
    .filter(t => !q || (t.note||'').toLowerCase().includes(q))
    .filter(t => !acc || t.account === acc)
    .filter(t => !cat || t.category === cat)
    .filter(t => !month || monthKey(t.date) === month)
    .slice()
    .sort((a,b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : b.id - a.id));
}

function renderTransactions(){
  const all = getFilteredTransactions();
  const shown = all.slice(0, txnPageSize);
  const tbody = document.getElementById('txnTableBody');

  if (shown.length === 0){
    tbody.innerHTML = `<tr><td colspan="8" class="muted" style="text-align:center;padding:24px;">Tidak ada transaksi yang cocok.</td></tr>`;
  } else {
    tbody.innerHTML = shown.map(t => {
      const balance = computeAccountBalance(t.account, t.date === undefined ? todayStr() : t.date);
      return `<tr data-id="${t.id}">
        <td>${t.date}</td>
        <td>${escapeHtml(t.account)}${t.transferTo ? ' → ' + escapeHtml(t.transferTo) : ''}</td>
        <td><span class="cat-badge"><span class="dot"></span>${escapeHtml(t.subcategory||t.category||'')}</span></td>
        <td>${escapeHtml(t.note)}</td>
        <td class="col-amount">${t.expense ? '<span class="amount-expense">'+formatRupiah(t.expense)+'</span>' : '<span class="muted">—</span>'}</td>
        <td class="col-amount">${t.income ? '<span class="amount-income">'+formatRupiah(t.income)+'</span>' : '<span class="muted">—</span>'}</td>
        <td class="col-amount muted">${formatRupiah(computeAccountBalanceAtRow(t))}</td>
        <td class="col-actions">✎</td>
      </tr>`;
    }).join('');
  }

  document.getElementById('txnLoadMore').style.display = all.length > shown.length ? 'inline-block' : 'none';

  const variance = computeBudgetVariance(todayStr());
  const varClass = variance >= 0 ? 'amount-income' : 'amount-expense';
  document.getElementById('txnCountInfo').innerHTML =
    `Menampilkan ${shown.length} dari ${all.length} transaksi &nbsp;·&nbsp; Variansi anggaran hari ini: <b class="${varClass}">${formatRupiah(variance)}</b>`;

  tbody.querySelectorAll('tr[data-id]').forEach(row => {
    row.addEventListener('click', () => openTxnModal(parseInt(row.dataset.id,10)));
  });
}

// running "account balance" shown per row, computed in chronological order per account
function computeAccountBalanceAtRow(txn){
  return computeAccountBalance(txn.account, txn.date) - tailSameDayAdjustment(txn);
}
// same-day rows: approximate using id order within the day for stable running balance
function tailSameDayAdjustment(txn){
  const sameDayLater = state.transactions.filter(t => t.account === txn.account && t.date === txn.date && t.id > txn.id);
  return sameDayLater.reduce((s,t) => s + (t.income||0) - (t.expense||0), 0)
       + state.transactions.filter(t => t.transferTo === txn.account && t.date === txn.date && t.id > txn.id).reduce((s,t) => s + (t.expense||0), 0);
}

function renderTxnFilters(){
  document.getElementById('txnSearch').addEventListener('input', () => { txnPageSize = 80; renderTransactions(); });
  document.getElementById('txnFilterAccount').addEventListener('change', () => { txnPageSize = 80; renderTransactions(); });
  document.getElementById('txnFilterCategory').addEventListener('change', () => { txnPageSize = 80; renderTransactions(); });
  document.getElementById('txnFilterMonth').addEventListener('change', () => { txnPageSize = 80; renderTransactions(); });
  document.getElementById('txnFilterReset').addEventListener('click', () => {
    document.getElementById('txnSearch').value = '';
    document.getElementById('txnFilterAccount').value = '';
    document.getElementById('txnFilterCategory').value = '';
    document.getElementById('txnFilterMonth').value = '';
    txnPageSize = 80;
    renderTransactions();
  });
  document.getElementById('txnLoadMore').addEventListener('click', () => { txnPageSize += 80; renderTransactions(); });
}

/* ---------------------------------------------------------------------
   TRANSAKSI MODAL (add / edit / delete)
   --------------------------------------------------------------------- */
let currentTxnType = 'expense';

function openTxnModal(id){
  const overlay = document.getElementById('txnModalOverlay');
  const form = document.getElementById('txnForm');
  form.reset();
  document.getElementById('txnId').value = '';
  document.getElementById('txnDeleteBtn').style.display = 'none';
  document.getElementById('txnModalTitle').textContent = 'Tambah Transaksi';

  if (id != null){
    const t = state.transactions.find(x => x.id === id);
    if (!t) return;
    document.getElementById('txnId').value = t.id;
    document.getElementById('txnModalTitle').textContent = 'Edit Transaksi';
    document.getElementById('txnDeleteBtn').style.display = 'inline-block';
    document.getElementById('fDate').value = t.date;
    document.getElementById('fAccount').value = t.account;
    document.getElementById('fNote').value = t.note || '';
    if (t.transferTo){
      setTxnType('transfer');
      document.getElementById('fTransferTo').value = t.transferTo;
      document.getElementById('fAmount').value = t.expense;
    } else if (t.income){
      setTxnType('income');
      document.getElementById('fCategory').value = t.category;
      updateSubcategoryOptions();
      document.getElementById('fSubcategory').value = t.subcategory;
      document.getElementById('fAmount').value = t.income;
    } else {
      setTxnType('expense');
      document.getElementById('fCategory').value = t.category;
      updateSubcategoryOptions();
      document.getElementById('fSubcategory').value = t.subcategory;
      document.getElementById('fAmount').value = t.expense;
    }
  } else {
    document.getElementById('fDate').value = todayStr();
    setTxnType('expense');
  }
  overlay.classList.add('active');
}
function closeTxnModal(){ document.getElementById('txnModalOverlay').classList.remove('active'); }

function setTxnType(type){
  currentTxnType = type;
  document.querySelectorAll('#fType .seg').forEach(b => b.classList.toggle('active', b.dataset.type === type));
  document.getElementById('rowTransferTo').style.display = type === 'transfer' ? 'flex' : 'none';
  document.getElementById('rowCategory').style.display = type === 'transfer' ? 'none' : 'flex';
  document.getElementById('rowSubcategory').style.display = type === 'transfer' ? 'none' : 'flex';
}

function initTxnModal(){
  document.getElementById('addTxnBtn').addEventListener('click', () => openTxnModal(null));
  document.getElementById('txnCancelBtn').addEventListener('click', closeTxnModal);
  document.getElementById('txnModalOverlay').addEventListener('click', e => { if (e.target.id === 'txnModalOverlay') closeTxnModal(); });
  document.querySelectorAll('#fType .seg').forEach(b => b.addEventListener('click', () => setTxnType(b.dataset.type)));
  document.getElementById('fCategory').addEventListener('change', updateSubcategoryOptions);

  document.getElementById('txnForm').addEventListener('submit', e => {
    e.preventDefault();
    const idRaw = document.getElementById('txnId').value;
    const date = document.getElementById('fDate').value;
    const account = document.getElementById('fAccount').value;
    const note = document.getElementById('fNote').value.trim();
    const amount = parseFloat(document.getElementById('fAmount').value) || 0;

    if (!date || !account || amount <= 0){ showToast('Lengkapi tanggal, akun, dan jumlah.'); return; }

    let txn = { date, account, note, expense:0, income:0, transferTo:null, category:'', subcategory:'' };

    if (currentTxnType === 'transfer'){
      const to = document.getElementById('fTransferTo').value;
      if (to === account){ showToast('Akun tujuan transfer harus berbeda.'); return; }
      txn.transferTo = to;
      txn.expense = amount;
      txn.category = 'Lifestyle';
      txn.subcategory = '🔁 Transfer Between Accounts';
    } else if (currentTxnType === 'income'){
      txn.income = amount;
      txn.category = document.getElementById('fCategory').value;
      txn.subcategory = document.getElementById('fSubcategory').value;
    } else {
      txn.expense = amount;
      txn.category = document.getElementById('fCategory').value;
      txn.subcategory = document.getElementById('fSubcategory').value;
    }

    if (idRaw){
      const id = parseInt(idRaw,10);
      const idx = state.transactions.findIndex(t => t.id === id);
      if (idx > -1) state.transactions[idx] = { ...state.transactions[idx], ...txn };
    } else {
      const nextId = state.transactions.reduce((m,t) => Math.max(m,t.id), 0) + 1;
      txn.id = nextId;
      state.transactions.push(txn);
    }
    saveState();
    closeTxnModal();
    renderAll();
    showToast('Transaksi tersimpan.');
  });

  document.getElementById('txnDeleteBtn').addEventListener('click', () => {
    const id = parseInt(document.getElementById('txnId').value,10);
    if (!id) return;
    if (!confirm('Hapus transaksi ini?')) return;
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveState();
    closeTxnModal();
    renderAll();
    showToast('Transaksi dihapus.');
  });
}

/* ---------------------------------------------------------------------
   SALDO TAB
   --------------------------------------------------------------------- */
function renderSaldo(){
  const cards = document.getElementById('accountCards');
  const today = todayStr();
  cards.innerHTML = state.accounts.map(a => `
    <div class="acc-card">
      <div class="acc-name">${escapeHtml(a.name)}</div>
      <div class="acc-balance">${formatRupiah(computeAccountBalance(a.name, today))}</div>
    </div>`).join('');

  const months = getMonthsRange();
  const head = document.getElementById('balanceTableHead');
  head.innerHTML = '<th>Akun</th>' + months.map(m => `<th>${monthLabel(m)}</th>`).join('');

  const body = document.getElementById('balanceTableBody');
  body.innerHTML = state.accounts.map(a => {
    const cells = months.map(m => `<td>${formatRupiah(computeAccountBalance(a.name, endOfMonthStr(m)))}</td>`).join('');
    return `<tr><td>${escapeHtml(a.name)}</td>${cells}</tr>`;
  }).join('');

  const foot = document.getElementById('balanceTableFoot');
  const incomeRow = months.map(m => `<td>${formatRupiah(monthlyIncome(m))}</td>`).join('');
  const expenseRow = months.map(m => `<td>${formatRupiah(monthlyExpense(m))}</td>`).join('');
  const netRow = months.map(m => `<td>${formatRupiah(monthlyIncome(m) - monthlyExpense(m))}</td>`).join('');
  const endRow = months.map(m => `<td>${formatRupiah(computeTotalBalance(endOfMonthStr(m)))}</td>`).join('');
  foot.innerHTML = `
    <tr><td>Pemasukan</td>${incomeRow}</tr>
    <tr><td>Pengeluaran</td>${expenseRow}</tr>
    <tr><td>Arus Kas Bersih</td>${netRow}</tr>
    <tr><td>Saldo Akhir Bulan</td>${endRow}</tr>`;
}

/* ---------------------------------------------------------------------
   RINCIAN (PIVOT) TAB
   --------------------------------------------------------------------- */
function renderPivot(){
  const monthFilter = document.getElementById('pivotMonth').value;
  const mode = document.getElementById('pivotMode').value;

  const txns = state.transactions.filter(t => !t.transferTo && t.expense > 0 && (!monthFilter || monthKey(t.date) === monthFilter));
  const total = txns.reduce((s,t) => s + t.expense, 0);

  if (mode === 'account'){
    const map = {};
    txns.forEach(t => { map[t.account] = (map[t.account]||0) + t.expense; });
    const rows = Object.entries(map).sort((a,b) => b[1]-a[1]);

    document.getElementById('pivotTableBody').innerHTML = rows.map(([acc,amt]) => `
      <tr><td>${escapeHtml(acc)}</td><td class="muted">—</td>
      <td class="col-amount">${formatRupiah(amt)}</td>
      <td class="col-amount">${total ? (amt/total*100).toFixed(1) : '0.0'}%</td></tr>`).join('') ||
      `<tr><td colspan="4" class="muted" style="text-align:center;padding:20px;">Tidak ada data.</td></tr>`;

    renderPivotBars(rows.map(([k,v]) => ({label:k, value:v})), total);
    return;
  }

  const map = {};
  txns.forEach(t => {
    const key = t.category || '(Tanpa kategori)';
    map[key] = map[key] || { total:0, subs:{} };
    map[key].total += t.expense;
    const subKey = t.subcategory || '(Tanpa subkategori)';
    map[key].subs[subKey] = (map[key].subs[subKey]||0) + t.expense;
  });

  const catRows = Object.entries(map).sort((a,b) => b[1].total - a[1].total);
  let html = '';
  catRows.forEach(([cat, info]) => {
    const subs = Object.entries(info.subs).sort((a,b) => b[1]-a[1]);
    subs.forEach(([sub, amt], i) => {
      html += `<tr>
        <td>${i===0 ? escapeHtml(cat) : ''}</td>
        <td>${escapeHtml(sub)}</td>
        <td class="col-amount">${formatRupiah(amt)}</td>
        <td class="col-amount">${total ? (amt/total*100).toFixed(1) : '0.0'}%</td>
      </tr>`;
    });
  });
  document.getElementById('pivotTableBody').innerHTML = html || `<tr><td colspan="4" class="muted" style="text-align:center;padding:20px;">Tidak ada data.</td></tr>`;

  renderPivotBars(catRows.map(([k,v]) => ({label:k, value:v.total})), total);
}

function renderPivotBars(items, total){
  const wrap = document.getElementById('pivotBars');
  const top = items.slice(0, 8);
  wrap.innerHTML = top.map(it => `
    <div class="pivot-bar-row">
      <div class="lbl"><span>${escapeHtml(it.label)}</span><b>${formatRupiah(it.value)}</b></div>
      <div class="pivot-bar-track"><div class="pivot-bar-fill" style="width:${total ? (it.value/total*100) : 0}%"></div></div>
    </div>`).join('') || '<p class="muted">Tidak ada data untuk periode ini.</p>';
}

function initPivotFilters(){
  document.getElementById('pivotMonth').addEventListener('change', renderPivot);
  document.getElementById('pivotMode').addEventListener('change', renderPivot);
}

/* ---------------------------------------------------------------------
   GRAFIK TAB (Chart.js)
   --------------------------------------------------------------------- */
let chartIE = null, chartPie = null, chartNW = null;
const PALETTE = ['#274472','#A9382F','#2E6B4F','#B6842A','#5C4A8C','#3A7C7C','#8C5A3A','#6B7C3A','#7A3A5C','#3A5C7C'];

function renderCharts(){
  const months = getMonthsRange();

  // 1. Income vs Expense per month
  const ctxIE = document.getElementById('chartIncomeExpense');
  if (chartIE) chartIE.destroy();
  chartIE = new Chart(ctxIE, {
    type: 'bar',
    data: {
      labels: months.map(monthLabel),
      datasets: [
        { label:'Pemasukan', data: months.map(monthlyIncome), backgroundColor:'#2E6B4F' },
        { label:'Pengeluaran', data: months.map(monthlyExpense), backgroundColor:'#A9382F' },
      ]
    },
    options: {
      responsive:true,
      plugins:{ legend:{ position:'bottom', labels:{ color:'#1E2A1B' } } },
      scales:{
        x:{ ticks:{ color:'#4B5C45' }, grid:{ color:'#D8E2CC' } },
        y:{ ticks:{ color:'#4B5C45', callback:v=>formatRupiah(v) }, grid:{ color:'#D8E2CC' } }
      }
    }
  });

  // 2. Expense by category (all time)
  const catMap = {};
  state.transactions.filter(t => !t.transferTo && t.expense > 0).forEach(t => {
    const k = t.category || '(Lainnya)';
    catMap[k] = (catMap[k]||0) + t.expense;
  });
  let entries = Object.entries(catMap).sort((a,b) => b[1]-a[1]);
  if (entries.length > 8){
    const head = entries.slice(0,7);
    const rest = entries.slice(7).reduce((s,e) => s+e[1], 0);
    entries = [...head, ['Lainnya', rest]];
  }
  const ctxPie = document.getElementById('chartCategoryPie');
  if (chartPie) chartPie.destroy();
  chartPie = new Chart(ctxPie, {
    type:'doughnut',
    data:{
      labels: entries.map(e => e[0]),
      datasets:[{ data: entries.map(e => e[1]), backgroundColor: PALETTE }]
    },
    options:{
      responsive:true,
      plugins:{ legend:{ position:'right', labels:{ color:'#1E2A1B', boxWidth:12, font:{size:10} } } }
    }
  });

  // 3. Net worth over time
  const ctxNW = document.getElementById('chartNetWorth');
  if (chartNW) chartNW.destroy();
  chartNW = new Chart(ctxNW, {
    type:'line',
    data:{
      labels: months.map(monthLabel),
      datasets:[{
        label:'Saldo Total',
        data: months.map(m => computeTotalBalance(endOfMonthStr(m))),
        borderColor:'#274472',
        backgroundColor:'rgba(39,68,114,0.12)',
        fill:true,
        tension:0.25,
        pointRadius:2
      }]
    },
    options:{
      responsive:true,
      plugins:{ legend:{ display:false } },
      scales:{
        x:{ ticks:{ color:'#4B5C45' }, grid:{ color:'#D8E2CC' } },
        y:{ ticks:{ color:'#4B5C45', callback:v=>formatRupiah(v) }, grid:{ color:'#D8E2CC' } }
      }
    }
  });
}

/* ---------------------------------------------------------------------
   PENGATURAN TAB
   --------------------------------------------------------------------- */
function renderSettings(){
  document.getElementById('dailyBudgetInput').value = state.settings.dailyBudgetLimit || 0;

  const accList = document.getElementById('accountList');
  accList.innerHTML = state.accounts.map(a => `
    <li data-name="${escapeHtml(a.name)}">
      <span>${escapeHtml(a.name)} <span class="muted">(awal: <b>${formatRupiah(a.base)}</b>)</span></span>
      <span class="remove-x" data-remove-account="${escapeHtml(a.name)}">✕</span>
    </li>`).join('');

  const catList = document.getElementById('categoryList');
  let html = '';
  state.categories.forEach(c => {
    c.subcategories.forEach(s => {
      html += `<li><span>${escapeHtml(c.name)} — ${escapeHtml(s)}</span>
        <span class="remove-x" data-remove-cat="${escapeHtml(c.name)}" data-remove-sub="${escapeHtml(s)}">✕</span></li>`;
    });
  });
  catList.innerHTML = html;

  accList.querySelectorAll('[data-remove-account]').forEach(el => {
    el.addEventListener('click', () => {
      const name = el.dataset.removeAccount;
      const used = state.transactions.some(t => t.account === name || t.transferTo === name);
      if (used){ showToast('Akun masih dipakai di transaksi, tidak bisa dihapus.'); return; }
      if (!confirm(`Hapus akun "${name}"?`)) return;
      state.accounts = state.accounts.filter(a => a.name !== name);
      saveState(); renderAll();
    });
  });
  catList.querySelectorAll('[data-remove-cat]').forEach(el => {
    el.addEventListener('click', () => {
      const catName = el.dataset.removeCat, subName = el.dataset.removeSub;
      const used = state.transactions.some(t => t.category === catName && t.subcategory === subName);
      if (used){ showToast('Subkategori masih dipakai di transaksi, tidak bisa dihapus.'); return; }
      const cat = state.categories.find(c => c.name === catName);
      cat.subcategories = cat.subcategories.filter(s => s !== subName);
      if (cat.subcategories.length === 0) state.categories = state.categories.filter(c => c.name !== catName);
      saveState(); renderAll();
    });
  });
}

function initSettings(){
  document.getElementById('dailyBudgetSave').addEventListener('click', () => {
    const v = parseFloat(document.getElementById('dailyBudgetInput').value) || 0;
    state.settings.dailyBudgetLimit = v;
    saveState(); renderAll();
    showToast('Batas anggaran harian disimpan.');
  });

  document.getElementById('addAccountBtn').addEventListener('click', () => {
    const name = document.getElementById('newAccountName').value.trim();
    const base = parseFloat(document.getElementById('newAccountBase').value) || 0;
    if (!name){ showToast('Nama akun tidak boleh kosong.'); return; }
    if (state.accounts.some(a => a.name.toLowerCase() === name.toLowerCase())){ showToast('Akun sudah ada.'); return; }
    state.accounts.push({ name, base });
    saveState();
    document.getElementById('newAccountName').value = '';
    document.getElementById('newAccountBase').value = '';
    renderAll();
    showToast('Akun ditambahkan.');
  });

  document.getElementById('addSubcategoryBtn').addEventListener('click', () => {
    const catName = document.getElementById('newCategoryName').value.trim();
    const subName = document.getElementById('newSubcategoryName').value.trim();
    if (!catName || !subName){ showToast('Isi kategori dan subkategori.'); return; }
    let cat = state.categories.find(c => c.name.toLowerCase() === catName.toLowerCase());
    if (!cat){ cat = { name: catName, subcategories: [] }; state.categories.push(cat); }
    if (cat.subcategories.some(s => s.toLowerCase() === subName.toLowerCase())){ showToast('Subkategori sudah ada.'); return; }
    cat.subcategories.push(subName);
    saveState();
    document.getElementById('newCategoryName').value = '';
    document.getElementById('newSubcategoryName').value = '';
    renderAll();
    showToast('Subkategori ditambahkan.');
  });

  document.getElementById('exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bukusaku-data-' + todayStr() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Data diekspor.');
  });

  document.getElementById('importInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const parsed = JSON.parse(reader.result);
        if (!Array.isArray(parsed.accounts) || !Array.isArray(parsed.categories) || !Array.isArray(parsed.transactions)){
          throw new Error('Struktur JSON tidak sesuai.');
        }
        if (!parsed.settings) parsed.settings = { dailyBudgetLimit: 50000 };
        state = parsed;
        saveState();
        renderAll();
        document.getElementById('importMsg').textContent = '';
        showToast('Data berhasil diimpor.');
      }catch(err){
        document.getElementById('importMsg').textContent = 'Gagal mengimpor: ' + err.message;
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    if (!confirm('Yakin ingin reset ke data awal? Semua perubahan akan hilang.')) return;
    state = JSON.parse(JSON.stringify(SEED_DATA));
    saveState();
    renderAll();
    showToast('Data direset ke keadaan awal.');
  });
}

/* ---------------------------------------------------------------------
   RENDER ALL / INIT
   --------------------------------------------------------------------- */
function renderAll(){
  populateDropdowns();
  renderStamp();
  renderTransactions();
  renderSaldo();
  renderPivot();
  renderSettings();
  if (document.getElementById('panel-grafik').classList.contains('active')) renderCharts();
}

document.addEventListener('DOMContentLoaded', () => {
  state = loadState();
  if (!state.settings) state.settings = { dailyBudgetLimit: 50000 };

  initTabs();
  initTxnModal();
  renderTxnFilters();
  initPivotFilters();
  initSettings();

  renderAll();
});
