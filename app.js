/* ============================================================
   MONEY MANAGER — app logic
   ============================================================ */

   const SEED = {"transactions": [{"id": 1, "date": "2026-03-02", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - TO", "expense": 13000, "transferTo": "", "income": 0}, {"id": 2, "date": "2026-03-02", "account": "GoPay", "category": "Lifestyle", "subcategory": "💸Game", "note": "Top Up HSR", "expense": 176490, "transferTo": "", "income": 0}, {"id": 3, "date": "2026-03-03", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 13000, "transferTo": "", "income": 0}, {"id": 4, "date": "2026-03-04", "account": "BNI", "category": "Daily Necessities", "subcategory": "🫙Food & Drink Container(s)", "note": "Ecentio Kotak Makan", "expense": 37050, "transferTo": "", "income": 0}], "categories": [{"category": "Food & Beverages", "subcategories": ["🍽️Main Meal", "🥛Drink", "🥯Snack", "🍌Fruits", "🍅Vegetables", "👨‍🍳Cooking ingredients", "🛵 Dining Out"]}, {"category": "Transportation", "subcategories": ["🏍️Motorcycle", "🚕Car", "🚌Bus", "🚐 Angkot", "🚅Train", "🚐 Travel", "⛽ Gasoline", "🛣️ Toll", "🅿️ Parking", "💳E-Money Card"]}, {"category": "Lifestyle", "subcategories": ["📈Trend", "💸Game", "🎲 Toys", "🧾 Fees & Charges", "🔁 Transfer Between Accounts", "🔁 Subscription", "💻 Laptop Maintenance"]}, {"category": "Daily Necessities", "subcategories": ["🧾 Household Contribution", "🛁 Toiletries", "🧼 Cleaning Supplies", "🫖 Water Gallon", "🪙Electricity Token", "🫙Food & Drink Container(s)", "🌐 Internet"]}, {"category": "Clothes", "subcategories": ["👕Shirt", "👖Pants", "🧥Jacket", "🥼Functional Clothing"]}, {"category": "Accessory", "subcategories": ["🧢Hat", "⌚Watch", "🗝️Keychain"]}, {"category": "Beauty", "subcategories": ["🧴Skincare", "✂️ Haircut"]}, {"category": "Health", "subcategories": ["💆Massage", "🏥 Pharmacy", "🩺 Medical Service"]}, {"category": "Education", "subcategories": ["📚Book"]}, {"category": "Present", "subcategories": ["👨‍👩‍👦‍👦For Family", "🎁 Gift"]}, {"category": "Accounts Receivable", "subcategories": ["🧾Receivable"]}, {"category": "Accounts Payable", "subcategories": ["💰Debt"]}, {"category": "Allowance", "subcategories": ["💵Allowance"]}, {"category": "Salary", "subcategories": ["💎Salary"]}, {"category": "Bonus", "subcategories": ["👛Bonus", "🪙THR"]}, {"category": "Adjustment", "subcategories": ["✏️ Error Correction"]}], "accounts": [{"name": "BNI", "type": "bank", "opening": 2359114}, {"name": "BNI 2", "type": "bank", "opening": 4232269}, {"name": "GoPay", "type": "ewallet", "opening": 210320}, {"name": "SeaBank", "type": "digital", "opening": 25293}, {"name": "ShopeePay", "type": "ewallet", "opening": 16000}, {"name": "Cash", "type": "cash", "opening": 12000}, {"name": "Dana", "type": "ewallet", "opening": 4274}, {"name": "Steam Wallet", "type": "ewallet", "opening": 0}, {"name": "Taplus", "type": "bank", "opening": 0}], "budgets": {"Food & Beverages": 1500000, "Transportation": 500000, "Lifestyle": 400000, "Daily Necessities": 300000, "Clothes": 200000}};
  const STORAGE_KEY = 'mm_money_manager_v1';
  
  // Fallback if category has no icon saved in state
  const CATEGORY_ICONS_FALLBACK = {
    'Food & Beverages':'🍽️','Transportation':'🚗','Lifestyle':'🎯','Daily Necessities':'🧺',
    'Clothes':'👕','Accessory':'💍','Beauty':'💄','Health':'🩺','Education':'📚','Present':'🎁',
    'Accounts Receivable':'🧾','Accounts Payable':'💳','Allowance':'💵','Salary':'💎','Bonus':'🪙','Adjustment':'✏️'
  };
  const ACCOUNT_ICONS = { bank:'🏦', digital: '📱', ewallet:'💳', cash:'💵' };
  const CHART_PALETTE = ['#5C9A66','#3C7247','#8FAE6A','#C4A24B','#BD5B3C','#8B6BA8','#4B85A6','#B0784F','#6D8C63','#A6555F','#5E9C8C','#9C8A5C','#7A9E4C','#C97F9E','#5A7DA6','#A88B4C'];
  const MONTHS_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  
  const ICONS = {
    plus:'<path d="M12 5v14M5 12h14"/>',
    download:'<path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>',
    upload:'<path d="M12 21V9m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>',
    refresh:'<path d="M3 12a9 9 0 0115.36-6.36M21 12a9 9 0 01-15.36 6.36"/><path d="M3 4v5h5M21 20v-5h-5"/>',
    edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    trash:'<path d="M3 6h18"/><path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m2 0v14a1 1 0 01-1 1H7a1 1 0 01-1-1V6h12z"/>',
    close:'<path d="M18 6L6 18M6 6l12 12"/>',
    wallet:'<path d="M3 7a2 2 0 012-2h13a1 1 0 011 1v2M3 7v10a2 2 0 002 2h14a1 1 0 001-1V9a1 1 0 00-1-1H5a2 2 0 01-2-2z"/><circle cx="16" cy="14" r="1.4"/>',
    copy:'<path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>'
  };
  function icon(name, cls){ return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls||''}">${ICONS[name]}</svg>`; }
  
  /* ============ STATE ============ */
  let state = loadState();
  let editingTxnId = null;
  let editingAcctName = null;
  let txnType = 'expense';
  let currentTab = 'dashboard';
  let filters = { account:'', category:'', type:'', q:'', date:'' };
  let txnPage = 0;
  const PAGE_SIZE = 40;

  let editingCatOldName = null;
  let duplicatingCatName = null;
  let editingSubOldName = null;
  let targetCatForSub = null;
  
  function loadState(){
    let parsed = JSON.parse(JSON.stringify(SEED));
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw){
        const userState = JSON.parse(raw);
        if(userState && Array.isArray(userState.transactions)) parsed = userState;
      }
    }catch(e){ console.warn('Failed to load saved data', e); }
    
    if(parsed.categories){
      parsed.categories.forEach(c => {
        if(!c.icon) c.icon = CATEGORY_ICONS_FALLBACK[c.category] || '📁';
      });
    }
    return parsed;
  }
  function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  
  /* ============ HELPERS ============ */
  function fmtCurrency(n){
    n = Math.round(n||0);
    const neg = n < 0;
    return (neg?'-':'') + 'Rp' + Math.abs(n).toLocaleString('en-US');
  }
  function fmtDateShort(d){
    const [y,m,day] = d.split('-').map(Number);
    return `${day} ${MONTHS_EN[m-1]} ${y}`;
  }
  function fmtMonthLabel(key){
    const [y,m] = key.split('-').map(Number);
    return `${MONTHS_EN[m-1]} ${y}`;
  }
  function dayName(d){ return DAYS_EN[new Date(d+'T00:00:00').getDay()]; }
  function todayStr(){ const d = new Date(); return d.toISOString().slice(0,10); }
  function uid(){ return Date.now()*1000 + Math.floor(Math.random()*1000); }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function catIcon(cat){ 
    const c = state.categories.find(x => x.category === cat);
    return c && c.icon ? c.icon : '📁'; 
  }

  function splitSub(str) {
    const m = str.match(/^(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*(.*)/u);
    if (m) return { icon: m[1], name: m[2].trim() };
    return { icon: '📁', name: str.trim() };
  }
  
  /* ============ LEDGER ENGINE ============ */
  function computeLedger(){
    const accBal = {};
    state.accounts.forEach(a=> accBal[a.name] = Number(a.opening)||0);
    let total = state.accounts.reduce((s,a)=> s + (Number(a.opening)||0), 0);
    const sorted = [...state.transactions].sort((a,b)=> a.date===b.date ? a.id-b.id : a.date.localeCompare(b.date));
    const enriched = [];
    for(const t of sorted){
      if(!(t.account in accBal)) accBal[t.account] = 0;
      const expense = Number(t.expense)||0, income = Number(t.income)||0;
      if(t.transferTo){
        accBal[t.account] -= expense;
        if(!(t.transferTo in accBal)) accBal[t.transferTo] = 0;
        accBal[t.transferTo] += expense;
      } else {
        total += income - expense;
        accBal[t.account] += income - expense;
      }
      enriched.push(Object.assign({}, t, { runningBalance: total, runningAccountBalance: accBal[t.account] }));
    }
    return { enriched, accBal, total };
  }
  
  function monthlyAggregate(enriched){
    if(enriched.length===0) return [];
    const openingTotal = state.accounts.reduce((s,a)=> s + (Number(a.opening)||0), 0);
    const first = enriched[0].date.slice(0,7);
    const now = todayStr().slice(0,7);
    const last = enriched[enriched.length-1].date.slice(0,7) > now ? enriched[enriched.length-1].date.slice(0,7) : now;
    const keys = [];
    let [y,m] = first.split('-').map(Number);
    const [ly,lm] = last.split('-').map(Number);
    while(y < ly || (y===ly && m<=lm)){
      keys.push(`${y}-${String(m).padStart(2,'0')}`);
      m++; if(m>12){m=1;y++;}
    }
    const byMonth = {};
    keys.forEach(k=> byMonth[k] = { key:k, income:0, expense:0, endBalance:null });
    enriched.forEach(t=>{
      const k = t.date.slice(0,7);
      if(!byMonth[k]) byMonth[k] = { key:k, income:0, expense:0, endBalance:null };
      if(!t.transferTo){
        byMonth[k].income += Number(t.income)||0;
        byMonth[k].expense += Number(t.expense)||0;
      }
      byMonth[k].endBalance = t.runningBalance;
    });
    let runningEnd = openingTotal;
    const out = keys.map(k=>{
      const row = byMonth[k];
      const start = runningEnd;
      const end = row.endBalance!=null ? row.endBalance : start;
      runningEnd = end;
      return { key:k, label:fmtMonthLabel(k), start, income:row.income, expense:row.expense, net:row.income-row.expense, end };
    });
    return out;
  }
  
  /* ============ CHARTS ============ */
  function renderDonut(data, size){
    size = size || 150;
    const total = data.reduce((s,d)=>s+d.value,0);
    const r = size*0.36, cx = size/2, cy = size/2, sw = size*0.155;
    const c = 2*Math.PI*r;
    if(total<=0){
      return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--border)" stroke-width="${sw}"/></svg>`;
    }
    let offset = 0, circles = '';
    data.forEach(d=>{
      const frac = d.value/total;
      const len = Math.max(frac*c - 1.5, 0);
      circles += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${d.color}" stroke-width="${sw}" stroke-dasharray="${len} ${c-len}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})" stroke-linecap="round"/>`;
      offset += frac*c;
    });
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${circles}</svg>`;
  }
  
  function renderMonthlyBars(months){
    const max = Math.max(1, ...months.map(m=>Math.max(m.income,m.expense)));
    return `<div class="bar-chart">` + months.map(m=>{
      const hIncome = Math.max(2, Math.round(m.income/max*118));
      const hExpense = Math.max(2, Math.round(m.expense/max*118));
      return `<div class="col">
        <div class="bars">
          <div class="bar" style="height:${hIncome}px;background:var(--income)" title="${esc(m.label)} · Income ${fmtCurrency(m.income)}"></div>
          <div class="bar" style="height:${hExpense}px;background:var(--expense)" title="${esc(m.label)} · Expense ${fmtCurrency(m.expense)}"></div>
        </div>
        <div class="col-label">${esc(m.label.split(' ')[0])}</div>
      </div>`;
    }).join('') + `</div>`;
  }
  
  /* ============ TOAST ============ */
  let toastTimer;
  function toast(msg){
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> el.classList.remove('show'), 2600);
  }
  
  /* ============ NAV ============ */
  const TABS = [
    { id:'dashboard', label:'Dashboard' },
    { id:'transactions', label:'Transactions' },
    { id:'balance', label:'Monthly Balance' },
    { id:'budgets', label:'Budgets' },
    { id:'categories', label:'Categories' },
    { id:'accounts', label:'Accounts' },
  ];
  function renderNav(){
    const nav = document.getElementById('tabNav');
    nav.innerHTML = TABS.map(t=> `<button class="tab-btn ${t.id===currentTab?'active':''}" data-tab="${t.id}"><span class="tab-dot"></span>${t.label}</button>`).join('');
    nav.querySelectorAll('.tab-btn').forEach(b=> b.addEventListener('click', ()=> switchTab(b.dataset.tab)));
  }
  function switchTab(tab){
    currentTab = tab;
    document.querySelectorAll('.view').forEach(v=> v.classList.toggle('active', v.id === 'view-'+tab));
    renderNav();
    renderCurrentTab();
    window.scrollTo({top:0, behavior:'smooth'});
  }
  function renderCurrentTab(){
    if(currentTab==='dashboard') renderDashboard();
    else if(currentTab==='transactions') renderTransactions();
    else if(currentTab==='balance') renderBalance();
    else if(currentTab==='budgets') renderBudgets();
    else if(currentTab==='categories') renderCategories();
    else if(currentTab==='accounts') renderAccounts();
  }
  
  /* ============ DASHBOARD ============ */
  function renderDashboard(){
    const { enriched, accBal, total } = computeLedger();
    const nowKey = todayStr().slice(0,7);
    const monthTx = enriched.filter(t=> t.date.slice(0,7)===nowKey);
    const income = monthTx.filter(t=>!t.transferTo).reduce((s,t)=>s+(t.income||0),0);
    const expense = monthTx.filter(t=>!t.transferTo).reduce((s,t)=>s+(t.expense||0),0);
    const net = income-expense;
  
    const el = document.getElementById('view-dashboard');
    el.innerHTML = `
      <div class="section-head">
        <div><h2>Dashboard</h2><p class="sub">Financial summary · ${fmtMonthLabel(nowKey)}</p></div>
        <div class="section-head-actions">
          <button class="btn btn-primary" id="btnAddTxnDash">${icon('plus')}Add Transaction</button>
        </div>
      </div>
      <div class="stat-grid">
        <div class="stat-card hero"><span class="swatch"></span>
          <div class="label">Total Balance</div>
          <div class="value">${fmtCurrency(total)}</div>
          <div class="delta">in ${state.accounts.length} accounts</div>
        </div>
        <div class="stat-card"><span class="swatch"></span>
          <div class="label">This Month's Income</div>
          <div class="value pos">${fmtCurrency(income)}</div>
          <div class="delta">${monthTx.filter(t=>!t.transferTo&&t.income>0).length} transactions</div>
        </div>
        <div class="stat-card"><span class="swatch"></span>
          <div class="label">This Month's Expense</div>
          <div class="value neg">${fmtCurrency(expense)}</div>
          <div class="delta">${monthTx.filter(t=>!t.transferTo&&t.expense>0).length} transactions</div>
        </div>
        <div class="stat-card"><span class="swatch"></span>
          <div class="label">Net Cash Flow</div>
          <div class="value ${net>=0?'pos':'neg'}">${fmtCurrency(net)}</div>
          <div class="delta">current month</div>
        </div>
      </div>
  
      <div class="dash-grid">
        <div class="card card-pad">
          <p class="panel-title">Monthly Trend</p>
          <p class="panel-sub">Income vs expenses, last 6 months</p>
          ${renderMonthlyBars(monthlyAggregate(enriched).slice(-6))}
          <div class="chart-legend">
            <div class="legend-item"><span class="legend-swatch" style="background:var(--income)"></span>Income</div>
            <div class="legend-item"><span class="legend-swatch" style="background:var(--expense)"></span>Expense</div>
          </div>
        </div>
        <div class="card card-pad">
          <p class="panel-title">Expenses by Category</p>
          <p class="panel-sub">Month of ${fmtMonthLabel(nowKey)}</p>
          ${renderCategoryDonutBlock(monthTx)}
        </div>
      </div>
  
      <div class="dash-grid">
        <div class="card card-pad">
          <p class="panel-title">Account Balances</p>
          <p class="panel-sub">Manage accounts in the 'Accounts' tab</p>
          <div class="acct-grid" style="grid-template-columns:repeat(2,1fr)">
            ${state.accounts.slice(0,6).map(a=>`
              <div class="acct-card" style="padding:12px 14px;">
                <div class="acct-top">
                  <div class="acct-icon">${ACCOUNT_ICONS[a.type]||'💳'}</div>
                  <span class="acct-type-tag">${a.type}</span>
                </div>
                <div class="acct-name">${esc(a.name)}</div>
                <div class="acct-balance" style="font-size:15px;">${fmtCurrency(accBal[a.name]||0)}</div>
              </div>`).join('')}
          </div>
        </div>
        <div class="card card-pad">
          <p class="panel-title">Recent Transactions</p>
          <p class="panel-sub">10 most recent transactions</p>
          <div>
            ${enriched.slice(-10).reverse().map(t=> recentItemHtmlDash(t)).join('') || emptyHtml('No transactions yet')}
          </div>
        </div>
      </div>
    `;
    document.getElementById('btnAddTxnDash').addEventListener('click', ()=> openTxnModal());
  }
  
  function recentItemHtmlDash(t){
    const isIncome = !t.transferTo && t.income>0;
    const isTransfer = !!t.transferTo;
    const amt = isTransfer ? t.expense : (isIncome ? t.income : t.expense);
    const sign = isTransfer ? '' : (isIncome ? '+' : '-');
    const color = isTransfer ? '' : (isIncome ? 'pos' : 'neg');
    
    let displayNote = esc(t.note) || esc(t.subcategory) || '—';
    if (isTransfer) {
      displayNote = t.note ? `${esc(t.note)} (To: ${esc(t.transferTo)})` : `Transfer to ${esc(t.transferTo)}`;
    }

    return `<div class="recent-item">
      <div class="recent-icon">${(t.subcategory||'').trim().slice(0,2) || catIcon(t.category)}</div>
      <div class="recent-mid">
        <div class="t1" title="${displayNote}">${displayNote}</div>
        <div class="t2">${fmtDateShort(t.date)} · ${esc(t.account)}</div>
      </div>
      <div class="recent-amt ${color}">${sign}${fmtCurrency(amt)}</div>
    </div>`;
  }
  function emptyHtml(msg){
    return `<div class="empty">${icon('wallet')}<div>${esc(msg)}</div></div>`;
  }
  
  function renderCategoryDonutBlock(monthTx){
    const byCat = {};
    monthTx.filter(t=>!t.transferTo && t.expense>0).forEach(t=>{
      byCat[t.category] = (byCat[t.category]||0) + t.expense;
    });
    const entries = Object.entries(byCat).sort((a,b)=>b[1]-a[1]);
    if(entries.length===0) return emptyHtml('No expenses this month');
    const top = entries.slice(0,7);
    const data = top.map(([cat,val],i)=> ({label:cat, value:val, color:CHART_PALETTE[i%CHART_PALETTE.length]}));
    const total = entries.reduce((s,[,v])=>s+v,0);
    return `<div style="display:flex; gap:20px; align-items:center; flex-wrap:wrap;">
      ${renderDonut(data,140)}
      <div style="flex:1; min-width:160px;">
        ${data.map(d=>`<div class="legend-item" style="justify-content:space-between; margin-bottom:6px;">
          <span style="display:flex;align-items:center;gap:7px;"><span class="legend-swatch" style="background:${d.color}"></span>${catIcon(d.label)} ${esc(d.label)}</span>
          <span style="font-family:var(--font-mono);font-weight:600;color:var(--ink)">${Math.round(d.value/total*100)}%</span>
        </div>`).join('')}
      </div>
    </div>`;
  }
  
  /* ============ TRANSACTIONS ============ */
  function renderTransactions(){
    const { enriched } = computeLedger();
    let list = [...enriched].reverse();
  
    if(filters.type) {
      if(filters.type === 'income') list = list.filter(t => !t.transferTo && t.income > 0);
      else if(filters.type === 'expense') list = list.filter(t => !t.transferTo && t.expense > 0);
      else if(filters.type === 'transfer') list = list.filter(t => !!t.transferTo);
    }
    if(filters.account) list = list.filter(t=>t.account===filters.account);
    if(filters.category) list = list.filter(t=>t.category===filters.category);
    if(filters.date) list = list.filter(t=>t.date===filters.date);
    if(filters.q){
      const q = filters.q.toLowerCase();
      list = list.filter(t=> (t.note||'').toLowerCase().includes(q) || (t.subcategory||'').toLowerCase().includes(q) || (t.transferTo||'').toLowerCase().includes(q));
    }
  
    const totalPages = Math.max(1, Math.ceil(list.length/PAGE_SIZE));
    txnPage = Math.min(txnPage, totalPages-1);
    const pageList = list.slice(txnPage*PAGE_SIZE, txnPage*PAGE_SIZE+PAGE_SIZE);
  
    const el = document.getElementById('view-transactions');
    el.innerHTML = `
      <div class="section-head">
        <div><h2>Transactions</h2><p class="sub">${list.length} transactions found</p></div>
        <div class="section-head-actions">
          <button class="btn btn-primary" id="btnAddTxn">${icon('plus')}Add Transaction</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th><th>Day</th><th>Account</th><th>Category</th><th>Note</th>
              <th style="text-align:right">Type</th><th style="text-align:right">Amount</th>
              <th></th>
            </tr>
            <tr class="table-filter-row">
              <td><input type="date" class="input" id="fDate" value="${filters.date}" title="Filter by Date"></td>
              <td></td>
              <td>
                <select class="input" id="fAccount">
                  <option value="">All</option>
                  ${state.accounts.map(a=>`<option value="${esc(a.name)}" ${filters.account===a.name?'selected':''}>${esc(a.name)}</option>`).join('')}
                </select>
              </td>
              <td>
                <select class="input" id="fCategory">
                  <option value="">All</option>
                  ${state.categories.map(c=>`<option value="${esc(c.category)}" ${filters.category===c.category?'selected':''}>${esc(c.category)}</option>`).join('')}
                </select>
              </td>
              <td><input type="text" class="input" id="fSearch" placeholder="Search notes..." value="${esc(filters.q)}"></td>
              <td style="text-align:right">
                <select class="input" id="fType">
                  <option value="">All</option>
                  <option value="income" ${filters.type==='income'?'selected':''}>Income</option>
                  <option value="expense" ${filters.type==='expense'?'selected':''}>Expense</option>
                  <option value="transfer" ${filters.type==='transfer'?'selected':''}>Transfer</option>
                </select>
              </td>
              <td></td>
              <td><button class="btn btn-ghost btn-sm" id="fClear" style="padding:4px 6px;">Clear</button></td>
            </tr>
          </thead>
          <tbody>
            ${pageList.map(t=>txnRowHtml(t)).join('') || `<tr><td colspan="8"><div class="empty">${icon('wallet')}<div>No matching transactions</div></div></td></tr>`}
          </tbody>
        </table>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px;">
        <span style="font-size:12.5px; color:var(--ink-muted)">Page ${txnPage+1} of ${totalPages}</span>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-sm" id="pgPrev" ${txnPage===0?'disabled':''}>← Previous</button>
          <button class="btn btn-sm" id="pgNext" ${txnPage>=totalPages-1?'disabled':''}>Next →</button>
        </div>
      </div>
    `;
  
    document.getElementById('btnAddTxn').addEventListener('click', ()=> openTxnModal());
    document.getElementById('fType').addEventListener('change', e=>{ filters.type=e.target.value; txnPage=0; renderTransactions(); });
    document.getElementById('fAccount').addEventListener('change', e=>{ filters.account=e.target.value; txnPage=0; renderTransactions(); });
    document.getElementById('fCategory').addEventListener('change', e=>{ filters.category=e.target.value; txnPage=0; renderTransactions(); });
    document.getElementById('fDate').addEventListener('change', e=>{ filters.date=e.target.value; txnPage=0; renderTransactions(); });
    document.getElementById('fSearch').addEventListener('input', e=>{ filters.q=e.target.value; txnPage=0; renderTransactions(); });
    document.getElementById('fClear').addEventListener('click', ()=>{ filters={account:'',category:'',type:'',q:'',date:''}; txnPage=0; renderTransactions(); });
    document.getElementById('pgPrev').addEventListener('click', ()=>{ txnPage=Math.max(0,txnPage-1); renderTransactions(); });
    document.getElementById('pgNext').addEventListener('click', ()=>{ txnPage=txnPage+1; renderTransactions(); });
    
    el.querySelectorAll('[data-edit]').forEach(b=> b.addEventListener('click', ()=> openTxnModal(Number(b.dataset.edit))));
    el.querySelectorAll('[data-dup]').forEach(b=> b.addEventListener('click', ()=> openTxnModal(Number(b.dataset.dup), true)));
    el.querySelectorAll('[data-del]').forEach(b=> b.addEventListener('click', ()=> deleteTxn(Number(b.dataset.del))));
  }
  
  function txnRowHtml(t){
    const isTransfer = !!t.transferTo;
    const isIncome = !isTransfer && t.income > 0;
    const amt = isTransfer ? t.expense : (isIncome ? t.income : t.expense);
    const color = isTransfer ? '' : (isIncome ? 'pos' : 'neg');
    const typeLabel = isTransfer ? 'Transfer' : (isIncome ? 'Income' : 'Expense');
    
    let displayNote = esc(t.note) || esc(t.subcategory) || '—';
    if (isTransfer) {
      displayNote = t.note ? `${esc(t.note)} (To: ${esc(t.transferTo)})` : `Transfer to ${esc(t.transferTo)}`;
    }
    
    return `<tr>
      <td>${fmtDateShort(t.date)}</td>
      <td>${dayName(t.date)}</td>
      <td>${esc(t.account)}</td>
      <td><div class="cell-cat"><span class="cat-chip">${catIcon(t.category)} ${esc(t.category)}</span></div></td>
      <td class="note-cell" title="${displayNote}">${displayNote}</td>
      <td style="text-align:right"><span class="cat-chip" style="opacity:0.8">${typeLabel}</span></td>
      <td class="num ${color}">${fmtCurrency(amt)}</td>
      <td><div class="row-actions">
        <button data-edit="${t.id}" title="Edit">${icon('edit')}</button>
        <button data-dup="${t.id}" title="Duplicate">${icon('copy')}</button>
        <button data-del="${t.id}" class="del" title="Delete">${icon('trash')}</button>
      </div></td>
    </tr>`;
  }
  
  function deleteTxn(id){
    if(!confirm('Delete this transaction? This cannot be undone.')) return;
    state.transactions = state.transactions.filter(t=>t.id!==id);
    saveState();
    renderTransactions();
    toast('Transaction deleted');
  }
  
  /* ============ TRANSACTION MODAL ============ */
  function openTxnModal(id, isDuplicate = false){
    editingTxnId = isDuplicate ? null : (id || null);
    const t = id ? state.transactions.find(x=>x.id===id) : null;
    txnType = t ? (t.transferTo ? 'transfer' : (t.income>0 ? 'income' : 'expense')) : 'expense';
  
    document.getElementById('txnModalTitle').textContent = isDuplicate ? 'Duplicate Transaction' : (id ? 'Edit Transaction' : 'Add Transaction');
    document.getElementById('txnDate').value = t ? t.date : todayStr();
    document.getElementById('txnAccount').innerHTML = state.accounts.map(a=>`<option value="${esc(a.name)}">${esc(a.name)}</option>`).join('');
    document.getElementById('txnAccount').value = t ? t.account : state.accounts[0].name;
    document.getElementById('txnNote').value = t ? (t.note||'') : '';
    document.getElementById('txnAmount').value = t ? (t.transferTo? t.expense : (t.income||t.expense||'')) : '';
  
    populateCategorySelect(t ? t.category : state.categories[0].category);
    document.getElementById('txnCategory').value = t ? t.category : state.categories[0].category;
    populateSubcategorySelect(document.getElementById('txnCategory').value, t? t.subcategory : '');
  
    document.getElementById('txnTransferTo').innerHTML = state.accounts.map(a=>`<option value="${esc(a.name)}">${esc(a.name)}</option>`).join('');
    if(t && t.transferTo) document.getElementById('txnTransferTo').value = t.transferTo;
  
    setTxnType(txnType);
    document.getElementById('txnModalOverlay').classList.add('open');
    document.getElementById('txnDate').focus();
  }
  function closeTxnModal(){ document.getElementById('txnModalOverlay').classList.remove('open'); }
  
  function populateCategorySelect(selected){
    const sel = document.getElementById('txnCategory');
    sel.innerHTML = state.categories.map(c=>`<option value="${esc(c.category)}">${catIcon(c.category)} ${esc(c.category)}</option>`).join('');
    if(selected) sel.value = selected;
  }
  function populateSubcategorySelect(cat, selected){
    const catObj = state.categories.find(c=>c.category===cat);
    const sel = document.getElementById('txnSubcategory');
    const subs = catObj ? catObj.subcategories : [];
    sel.innerHTML = `<option value="">—</option>` + subs.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('');
    if(selected) sel.value = selected;
  }
  
  function setTxnType(type){
    txnType = type;
    document.querySelectorAll('.type-toggle button').forEach(b=> b.classList.toggle('active', b.dataset.type===type));
    document.getElementById('rowCategory').style.display = type==='transfer' ? 'none' : 'flex';
    document.getElementById('rowTransfer').style.display = type==='transfer' ? 'flex' : 'none';
    document.getElementById('amountLabel').textContent = type==='income' ? 'Income Amount' : (type==='transfer' ? 'Transfer Amount' : 'Expense Amount');
  }
  
  function saveTxnForm(){
    const date = document.getElementById('txnDate').value;
    const account = document.getElementById('txnAccount').value;
    const note = document.getElementById('txnNote').value.trim();
    const amount = Number(document.getElementById('txnAmount').value) || 0;
    if(!date){ toast('Date is required'); return; }
    if(amount<=0){ toast('Amount must be greater than 0'); return; }
  
    let payload = { date, account, note, category:'', subcategory:'', expense:0, income:0, transferTo:'' };
    if(txnType==='transfer'){
      const to = document.getElementById('txnTransferTo').value;
      if(to===account){ toast('Target account must be different'); return; }
      payload.category = 'Lifestyle';
      payload.subcategory = '🔁 Transfer Between Accounts';
      payload.expense = amount;
      payload.transferTo = to;
    } else if(txnType==='income'){
      payload.category = document.getElementById('txnCategory').value;
      payload.subcategory = document.getElementById('txnSubcategory').value;
      payload.income = amount;
    } else {
      payload.category = document.getElementById('txnCategory').value;
      payload.subcategory = document.getElementById('txnSubcategory').value;
      payload.expense = amount;
    }
  
    if(editingTxnId){
      const idx = state.transactions.findIndex(t=>t.id===editingTxnId);
      state.transactions[idx] = Object.assign({id:editingTxnId}, payload);
      toast('Transaction updated');
    } else {
      state.transactions.push(Object.assign({id:uid()}, payload));
      toast('Transaction added');
    }
    saveState();
    closeTxnModal();
    renderCurrentTab();
  }
  
  /* ============ BALANCE (MONTHLY) ============ */
  function renderBalance(){
    const { enriched } = computeLedger();
    const months = monthlyAggregate(enriched);
    const el = document.getElementById('view-balance');
    el.innerHTML = `
      <div class="section-head">
        <div><h2>Monthly Balance</h2><p class="sub">Cash flow summary per month, calculated automatically</p></div>
      </div>
      <div class="card card-pad" style="margin-bottom:18px;">
        <p class="panel-title">End of Month Balance Trend</p>
        ${renderMonthlyBars(months)}
        <div class="chart-legend">
          <div class="legend-item"><span class="legend-swatch" style="background:var(--income)"></span>Income</div>
          <div class="legend-item"><span class="legend-swatch" style="background:var(--expense)"></span>Expense</div>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>Month</th><th style="text-align:right">Opening Balance</th><th style="text-align:right">Income</th>
            <th style="text-align:right">Expense</th><th style="text-align:right">Net Cash Flow</th><th style="text-align:right">Ending Balance</th>
          </tr></thead>
          <tbody>
            ${months.slice().reverse().map(m=>`<tr>
              <td style="font-weight:600">${esc(m.label)}</td>
              <td class="num">${fmtCurrency(m.start)}</td>
              <td class="num pos">${fmtCurrency(m.income)}</td>
              <td class="num neg">${fmtCurrency(m.expense)}</td>
              <td class="num ${m.net>=0?'pos':'neg'}">${fmtCurrency(m.net)}</td>
              <td class="num" style="font-weight:600">${fmtCurrency(m.end)}</td>
            </tr>`).join('') || `<tr><td colspan="6"><div class="empty">No data available</div></td></tr>`}
          </tbody>
        </table>
      </div>
    `;
  }
  
  /* ============ BUDGETS ============ */
  function renderBudgets() {
    const { enriched } = computeLedger();
    const nowKey = todayStr().slice(0,7);
    const spendByCat = {};
    enriched.filter(t=>t.date.slice(0,7)===nowKey && !t.transferTo).forEach(t=>{
      spendByCat[t.category] = (spendByCat[t.category]||0) + (t.expense||0);
    });
  
    const el = document.getElementById('view-budgets');
    el.innerHTML = `
      <div class="section-head">
        <div><h2>Budgets</h2><p class="sub">Monitor monthly spending limits · ${fmtMonthLabel(nowKey)}</p></div>
      </div>
  
      <div class="card card-pad" style="margin-bottom:20px;">
        <p class="panel-title">Monthly Budgets</p>
        <p class="panel-sub">Set spending limits per category — set to 0 to disable tracking for that category.</p>
        <div class="budget-list">
          ${state.categories.map(c=>{
            const budget = (state.budgets && state.budgets[c.category]) || 0;
            const spend = spendByCat[c.category] || 0;
            const pct = budget>0 ? Math.min(100, Math.round(spend/budget*100)) : 0;
            const over = budget>0 && spend>budget;
            if(budget<=0 && spend<=0) return ''; // Hide unbudgeted unused categories
            return `<div class="budget-row">
              <div class="budget-top">
                <span class="cat-label">${catIcon(c.category)} ${esc(c.category)}</span>
                <span class="amounts">${fmtCurrency(spend)} <input type="number" class="input" data-budget="${esc(c.category)}" value="${budget}" style="width:110px; display:inline-block; padding:4px 8px; margin-left:6px;"></span>
              </div>
              <div class="bar-track"><div class="bar-fill ${over?'over':''}" style="width:${budget>0?pct:0}%"></div></div>
            </div>`;
          }).join('') || emptyHtml('No active budgets')}
        </div>
      </div>
    `;
    
    el.querySelectorAll('[data-budget]').forEach(inp=>{
      inp.addEventListener('change', ()=>{
        state.budgets = state.budgets || {};
        state.budgets[inp.dataset.budget] = Number(inp.value)||0;
        saveState(); renderBudgets(); toast('Budget saved');
      });
    });
  }

  /* ============ CATEGORIES ============ */
  function renderCategories(){
    const el = document.getElementById('view-categories');
    el.innerHTML = `
      <div class="section-head">
        <div><h2>Categories</h2><p class="sub">Manage and organize your transaction categories</p></div>
        <div class="section-head-actions">
          <button class="btn btn-primary" id="btnAddCat">${icon('plus')}New Category</button>
        </div>
      </div>
  
      <div id="catList" class="card card-pad">
        ${state.categories.map(c=>`
          <div class="cat-section">
            <h4>
              <span class="cat-icon-edit" data-editcat="${esc(c.category)}" title="Edit Category">${catIcon(c.category)}</span>
              ${esc(c.category)}
              <div class="cat-actions">
                <button class="icon-btn-micro" data-addsub="${esc(c.category)}" title="Add Subcategory">${icon('plus')}</button>
                <button class="icon-btn-micro" data-editcat="${esc(c.category)}" title="Edit Category Name">${icon('edit')}</button>
                <button class="icon-btn-micro" data-dupcat="${esc(c.category)}" title="Duplicate Category">${icon('copy')}</button>
                <button class="icon-btn-micro del" data-delcat="${esc(c.category)}" title="Delete Category">${icon('trash')}</button>
              </div>
            </h4>
            <div class="sub-grid">
              ${c.subcategories.map(s=>{
                const parts = splitSub(s);
                return `
                <span class="sub-chip">
                  <span class="cat-icon-edit" data-editsub="${esc(c.category)}|${esc(s)}" title="Edit Subcategory">${parts.icon}</span>
                  ${esc(parts.name)}
                  <button class="icon-btn-micro" data-editsub="${esc(c.category)}|${esc(s)}" title="Edit">${icon('edit')}</button>
                  <button class="icon-btn-micro del" data-delsub="${esc(c.category)}|${esc(s)}" title="Delete">${icon('trash')}</button>
                </span>
              `}).join('') || '<span class="sub-chip" style="opacity:.6">No subcategories</span>'}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  
    // Add / Edit / Duplicate Categories -> Uses Modal
    document.getElementById('btnAddCat').addEventListener('click', ()=> openCatModal());
    el.querySelectorAll('[data-editcat]').forEach(b=> b.addEventListener('click', ()=> openCatModal(b.dataset.editcat)));
    el.querySelectorAll('[data-dupcat]').forEach(b=> b.addEventListener('click', ()=> openCatModal(b.dataset.dupcat, true)));
    el.querySelectorAll('[data-delcat]').forEach(b=> b.addEventListener('click', ()=> deleteCategory(b.dataset.delcat)));
    
    // Add / Edit / Delete Subcategories -> Uses Modal
    el.querySelectorAll('[data-addsub]').forEach(b=> b.addEventListener('click', ()=> openSubModal(b.dataset.addsub)));
    el.querySelectorAll('[data-editsub]').forEach(b=> {
      b.addEventListener('click', ()=> {
        const [cat, sub] = b.dataset.editsub.split('|');
        openSubModal(cat, sub);
      });
    });
    el.querySelectorAll('[data-delsub]').forEach(b=> {
      b.addEventListener('click', ()=> {
        const [cat, sub] = b.dataset.delsub.split('|');
        deleteSubcategory(cat, sub);
      });
    });
  }

  // --- Category & Subcategory Modals Logic ---

  function setEmojiPicker(btnId, inputId, emoji) {
    document.getElementById(inputId).value = emoji;
    document.getElementById(btnId).textContent = emoji;
  }

  function openCatModal(name = null, isDuplicate = false) {
    editingCatOldName = isDuplicate ? null : name;
    duplicatingCatName = isDuplicate ? name : null;

    const c = name ? state.categories.find(x => x.category === name) : null;
    
    document.getElementById('catModalTitle').textContent = isDuplicate ? 'Duplicate Category' : (name ? 'Edit Category' : 'Add Category');
    
    let defaultName = '';
    if(c) defaultName = isDuplicate ? c.category + ' Copy' : c.category;
    document.getElementById('catName').value = defaultName;
    
    setEmojiPicker('btnCatIcon', 'catIconValue', c ? c.icon : '📁');

    document.getElementById('catModalOverlay').classList.add('open');
    document.getElementById('catName').focus();
  }
  function closeCatModal() { document.getElementById('catModalOverlay').classList.remove('open'); }

  function saveCatForm() {
    const newName = document.getElementById('catName').value.trim();
    const newIcon = document.getElementById('catIconValue').value;

    if (!newName) { toast('Category name is required'); return; }

    if (editingCatOldName) {
      if (newName !== editingCatOldName && state.categories.some(c => c.category.toLowerCase() === newName.toLowerCase())) {
        toast('Category name already exists'); return;
      }
      const cat = state.categories.find(c => c.category === editingCatOldName);
      cat.category = newName;
      cat.icon = newIcon;

      if (state.budgets && state.budgets[editingCatOldName] !== undefined && newName !== editingCatOldName) {
          state.budgets[newName] = state.budgets[editingCatOldName];
          delete state.budgets[editingCatOldName];
      }
      if (newName !== editingCatOldName) {
          state.transactions.forEach(t => { if (t.category === editingCatOldName) t.category = newName; });
      }
      toast('Category updated');
    } else {
      if (state.categories.some(c => c.category.toLowerCase() === newName.toLowerCase())) {
        toast('Category name already exists'); return;
      }
      let subs = [];
      if (duplicatingCatName) {
        const orig = state.categories.find(c => c.category === duplicatingCatName);
        if (orig) subs = [...orig.subcategories];
      }
      state.categories.push({ category: newName, icon: newIcon, subcategories: subs });
      toast(duplicatingCatName ? 'Category duplicated' : 'Category added');
    }

    saveState(); renderCategories(); closeCatModal();
  }

  function openSubModal(catName, subName = null) {
    targetCatForSub = catName;
    editingSubOldName = subName;

    document.getElementById('subModalTitle').textContent = subName ? 'Edit Subcategory' : 'Add Subcategory';
    
    let icon = '📁';
    let name = '';
    
    if (subName) {
      const parts = splitSub(subName);
      icon = parts.icon;
      name = parts.name;
    }

    document.getElementById('subName').value = name;
    setEmojiPicker('btnSubIcon', 'subIconValue', icon);
    
    document.getElementById('subModalOverlay').classList.add('open');
    document.getElementById('subName').focus();
  }
  function closeSubModal() { document.getElementById('subModalOverlay').classList.remove('open'); }

  function saveSubForm() {
    const name = document.getElementById('subName').value.trim();
    const icon = document.getElementById('subIconValue').value;
    if (!name) { toast('Subcategory name is required'); return; }

    const newSub = icon + name;
    const cat = state.categories.find(c => c.category === targetCatForSub);
    if (!cat) return;

    if (editingSubOldName) {
      if (newSub !== editingSubOldName && cat.subcategories.includes(newSub)) { 
        toast('Subcategory already exists'); return; 
      }
      cat.subcategories = cat.subcategories.map(s => s === editingSubOldName ? newSub : s);
      state.transactions.forEach(t => {
          if (t.category === targetCatForSub && t.subcategory === editingSubOldName) t.subcategory = newSub;
      });
      toast('Subcategory updated');
    } else {
      if (cat.subcategories.includes(newSub)) { toast('Subcategory already exists'); return; }
      cat.subcategories.push(newSub);
      toast('Subcategory added');
    }

    saveState(); renderCategories(); closeSubModal();
  }

  function deleteCategory(name) {
    const used = state.transactions.some(t => t.category === name);
    if (used) { toast('Cannot delete: Category is currently used in transactions'); return; }
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    state.categories = state.categories.filter(c => c.category !== name);
    if (state.budgets) delete state.budgets[name];
    saveState(); renderCategories(); toast('Category deleted');
  }

  function deleteSubcategory(catName, subName) {
    const used = state.transactions.some(t => t.category === catName && t.subcategory === subName);
    if (used) { toast('Cannot delete: Subcategory is currently used in transactions'); return; }
    if (!confirm(`Are you sure you want to delete subcategory "${subName}"?`)) return;
    const cat = state.categories.find(c => c.category === catName);
    if (cat) cat.subcategories = cat.subcategories.filter(s => s !== subName);
    saveState(); renderCategories(); toast('Subcategory deleted');
  }
  
  /* ============ ACCOUNTS ============ */
  function renderAccounts(){
    const { accBal } = computeLedger();
    const el = document.getElementById('view-accounts');
    el.innerHTML = `
      <div class="section-head">
        <div><h2>Accounts</h2><p class="sub">Balances are calculated dynamically. Editing current balance will automatically adjust opening entry.</p></div>
        <div class="section-head-actions">
          <button class="btn btn-primary" id="btnAddAcct">${icon('plus')}Add Account</button>
        </div>
      </div>
      <div class="acct-grid">
        ${state.accounts.map(a=>`
          <div class="acct-card" data-acct="${esc(a.name)}">
            <div class="acct-top">
              <div class="acct-icon">${ACCOUNT_ICONS[a.type]||'💳'}</div>
              <span class="acct-type-tag">${a.type}</span>
            </div>
            <div class="acct-name">${esc(a.name)}</div>
            <div class="acct-balance">${fmtCurrency(accBal[a.name]||0)}</div>
            <div class="row-actions" style="justify-content:flex-end;">
              <button data-editacct="${esc(a.name)}" title="Edit">${icon('edit')}</button>
              <button data-dupacct="${esc(a.name)}" title="Duplicate">${icon('copy')}</button>
              <button data-delacct="${esc(a.name)}" class="del" title="Delete">${icon('trash')}</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    document.getElementById('btnAddAcct').addEventListener('click', ()=> openAcctModal());
    el.querySelectorAll('[data-editacct]').forEach(b=> b.addEventListener('click', ()=> openAcctModal(b.dataset.editacct)));
    el.querySelectorAll('[data-dupacct]').forEach(b=> b.addEventListener('click', ()=> duplicateAcct(b.dataset.dupacct)));
    el.querySelectorAll('[data-delacct]').forEach(b=> b.addEventListener('click', ()=> deleteAcct(b.dataset.delacct)));
  }
  
  function deleteAcct(name){
    const used = state.transactions.some(t=>t.account===name || t.transferTo===name);
    if(used){ toast('Cannot delete account: still used in transactions'); return; }
    if(!confirm(`Delete account "${name}"?`)) return;
    state.accounts = state.accounts.filter(a=>a.name!==name);
    saveState();
    renderAccounts();
    toast('Account deleted');
  }

  function duplicateAcct(name){
    const { accBal } = computeLedger();
    const a = state.accounts.find(x=>x.name===name);
    if(!a) return;
    const newName = prompt('Enter name for duplicated account:', a.name + ' Copy');
    if(!newName || newName.trim() === '') return;
    if(state.accounts.some(x=>x.name.toLowerCase()===newName.trim().toLowerCase())){
        toast('Account name already exists'); return;
    }
    state.accounts.push({ name: newName.trim(), type: a.type, opening: accBal[a.name] || 0 });
    saveState(); renderAccounts(); toast('Account duplicated');
  }
  
  function openAcctModal(name){
    editingAcctName = name || null;
    const { accBal } = computeLedger();
    const a = name ? state.accounts.find(x=>x.name===name) : null;
    
    document.getElementById('acctModalTitle').textContent = name ? 'Edit Account' : 'Add Account';
    document.getElementById('acctName').value = a ? a.name : '';
    document.getElementById('acctType').value = a ? a.type : 'bank';
    
    // Bind to current balance visually instead of purely opening logic
    document.getElementById('acctBalance').value = a ? (accBal[a.name] || 0) : 0;
    
    document.getElementById('acctModalOverlay').classList.add('open');
    document.getElementById('acctName').focus();
  }
  function closeAcctModal(){ document.getElementById('acctModalOverlay').classList.remove('open'); }
  
  function saveAcctForm(){
    const name = document.getElementById('acctName').value.trim();
    const type = document.getElementById('acctType').value;
    const currentBalanceTarget = Number(document.getElementById('acctBalance').value)||0;
    
    if(!name){ toast('Account name is required'); return; }
    
    if(editingAcctName){
      const { accBal } = computeLedger();
      const idx = state.accounts.findIndex(a=>a.name===editingAcctName);
      
      if(editingAcctName!==name && state.accounts.some(a=>a.name===name)){
         toast('Account name already used'); return; 
      }
      
      const oldCurrentBalance = accBal[editingAcctName] || 0;
      const difference = currentBalanceTarget - oldCurrentBalance;

      if(editingAcctName!==name){
        state.transactions.forEach(t=>{
          if(t.account===editingAcctName) t.account=name;
          if(t.transferTo===editingAcctName) t.transferTo=name;
        });
      }
      
      state.accounts[idx].name = name;
      state.accounts[idx].type = type;
      state.accounts[idx].opening = (Number(state.accounts[idx].opening) || 0) + difference;
      
      toast('Account updated');
    } else {
      if(state.accounts.some(a=>a.name===name)){ toast('Account name already used'); return; }
      state.accounts.push({ name, type, opening: currentBalanceTarget });
      toast('Account added');
    }
    
    saveState();
    closeAcctModal();
    renderCurrentTab();
  }
  
  /* ============ IMPORT / EXPORT / RESET ============ */
  function exportData(){
    const blob = new Blob([JSON.stringify(state, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `money-manager-${todayStr()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    toast('Data exported');
  }
  function importData(file){
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const parsed = JSON.parse(reader.result);
        if(!Array.isArray(parsed.transactions) || !Array.isArray(parsed.accounts)) throw new Error('Invalid format');
        state = parsed;
        saveState();
        renderCurrentTab();
        toast('Data imported successfully');
      }catch(e){
        toast('Failed to import: invalid file');
      }
    };
    reader.readAsText(file);
  }
  function resetData(){
    if(!confirm('Reset to demo data? All local changes will be lost.')) return;
    state = JSON.parse(JSON.stringify(SEED));
    saveState();
    renderCurrentTab();
    toast('Data reset to defaults');
  }
  
  /* ============ INIT ============ */
  function init(){
    renderNav();
    document.querySelectorAll('.view').forEach(v=> v.classList.toggle('active', v.id==='view-'+currentTab));
    renderCurrentTab();
    
    // Emoji Popover Toggles
    document.getElementById('btnCatIcon').addEventListener('click', () => {
      document.getElementById('catEmojiPopover').classList.toggle('show');
    });
    document.querySelector('#catEmojiPopover emoji-picker').addEventListener('emoji-click', e => {
      setEmojiPicker('btnCatIcon', 'catIconValue', e.detail.unicode);
      document.getElementById('catEmojiPopover').classList.remove('show');
    });
    
    document.getElementById('btnSubIcon').addEventListener('click', () => {
      document.getElementById('subEmojiPopover').classList.toggle('show');
    });
    document.querySelector('#subEmojiPopover emoji-picker').addEventListener('emoji-click', e => {
      setEmojiPicker('btnSubIcon', 'subIconValue', e.detail.unicode);
      document.getElementById('subEmojiPopover').classList.remove('show');
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.emoji-dropdown-wrap')) {
        document.querySelectorAll('.emoji-popover').forEach(p => p.classList.remove('show'));
      }
    });

    // Export/Import/Reset
    document.getElementById('btnExport').addEventListener('click', exportData);
    document.getElementById('btnImport').addEventListener('click', ()=> document.getElementById('importFileInput').click());
    document.getElementById('importFileInput').addEventListener('change', e=>{ if(e.target.files[0]) importData(e.target.files[0]); e.target.value=''; });
    document.getElementById('btnReset').addEventListener('click', resetData);
  
    // Transactions
    document.getElementById('txnCategory').addEventListener('change', e=> populateSubcategorySelect(e.target.value));
    document.querySelectorAll('.type-toggle button').forEach(b=> b.addEventListener('click', ()=> setTxnType(b.dataset.type)));
    document.getElementById('btnTxnSave').addEventListener('click', saveTxnForm);
    document.getElementById('btnTxnCancel').addEventListener('click', closeTxnModal);
    document.getElementById('btnTxnClose').addEventListener('click', closeTxnModal);
    document.getElementById('txnModalOverlay').addEventListener('click', e=>{ if(e.target.id==='txnModalOverlay') closeTxnModal(); });
  
    // Accounts
    document.getElementById('btnAcctSave').addEventListener('click', saveAcctForm);
    document.getElementById('btnAcctCancel').addEventListener('click', closeAcctModal);
    document.getElementById('btnAcctClose').addEventListener('click', closeAcctModal);
    document.getElementById('acctModalOverlay').addEventListener('click', e=>{ if(e.target.id==='acctModalOverlay') closeAcctModal(); });

    // Categories
    document.getElementById('btnCatSave').addEventListener('click', saveCatForm);
    document.getElementById('btnCatCancel').addEventListener('click', closeCatModal);
    document.getElementById('btnCatClose').addEventListener('click', closeCatModal);
    document.getElementById('catModalOverlay').addEventListener('click', e=>{ if(e.target.id==='catModalOverlay') closeCatModal(); });

    // Subcategories
    document.getElementById('btnSubSave').addEventListener('click', saveSubForm);
    document.getElementById('btnSubCancel').addEventListener('click', closeSubModal);
    document.getElementById('btnSubClose').addEventListener('click', closeSubModal);
    document.getElementById('subModalOverlay').addEventListener('click', e=>{ if(e.target.id==='subModalOverlay') closeSubModal(); });
  
    document.addEventListener('keydown', e=>{
      if(e.key==='Escape'){ 
        closeTxnModal(); closeAcctModal(); closeCatModal(); closeSubModal(); 
        document.querySelectorAll('.emoji-popover').forEach(p => p.classList.remove('show'));
      }
    });
  }
  document.addEventListener('DOMContentLoaded', init);
