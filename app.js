/* ============================================================
   MONEY MANAGER — app logic
   ============================================================ */

   // Default SEED with 0 Transactions and 0 Accounts
   const SEED = {
    "transactions": [], 
    "categories": [
      {"category": "Food & Beverages", "icon": "🍽️", "type": "expense", "subcategories": ["🍽️ Main Meal", "🥛 Drink", "🥯 Snack", "🍌 Fruits", "🍅 Vegetables", "👨‍🍳 Cooking ingredients", "🛵 Dining Out"]},
      {"category": "Transportation", "icon": "🚗", "type": "expense", "subcategories": ["🏍️ Motorcycle", "🚕 Car", "🚌 Bus", "🚐 Travel", "⛽ Gasoline", "🅿️ Parking", "💳 E-Money Card"]},
      {"category": "Lifestyle", "icon": "🎯", "type": "expense", "subcategories": ["📈 Trend", "💸 Game", "🧾 Fees & Charges", "🔁 Transfer Between Accounts", "🔁 Subscription"]},
      {"category": "Daily Necessities", "icon": "🧺", "type": "expense", "subcategories": ["🧾 Household Contribution", "🛁 Toiletries", "🧼 Cleaning Supplies", "🪙 Electricity Token", "🌐 Internet"]},
      {"category": "Clothes", "icon": "👕", "type": "expense", "subcategories": ["👕 Shirt", "👖 Pants", "🧥 Jacket", "🥼 Functional Clothing"]},
      {"category": "Accessory", "icon": "💍", "type": "expense", "subcategories": ["🧢 Hat", "⌚ Watch", "🗝️ Keychain"]},
      {"category": "Beauty", "icon": "💄", "type": "expense", "subcategories": ["🧴 Skincare", "✂️ Haircut"]},
      {"category": "Health", "icon": "🩺", "type": "expense", "subcategories": ["💆 Massage", "🏥 Pharmacy", "🩺 Medical Service"]},
      {"category": "Education", "icon": "📚", "type": "expense", "subcategories": ["📚 Book"]},
      {"category": "Present", "icon": "🎁", "type": "expense", "subcategories": ["👨‍👩‍👦‍👦 For Family", "🎁 Gift"]},
      {"category": "Accounts Payable", "icon": "💳", "type": "expense", "subcategories": ["💰 Debt"]},
      {"category": "Accounts Receivable", "icon": "🧾", "type": "income", "subcategories": ["🧾 Receivable"]},
      {"category": "Allowance", "icon": "💵", "type": "income", "subcategories": ["💵 Allowance"]},
      {"category": "Salary", "icon": "💎", "type": "income", "subcategories": ["💎 Salary"]},
      {"category": "Bonus", "icon": "🪙", "type": "income", "subcategories": ["👛 Bonus", "🪙 THR"]},
      {"category": "Adjustment", "icon": "✏️", "type": "both", "subcategories": ["✏️ Error Correction"]}
    ], 
    "accounts": [], 
    "budgets": {},
    "recentEmojis": ['📁', '🍽️', '🚗', '🎯', '🧺', '👕', '💵', '✏️']
  };
  
  const STORAGE_KEY = 'mm_money_manager_v1';
  
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
    copy:'<path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>',
    sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
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
    
    // Migration: ensure every category has an icon and type for backward compatibility
    if(parsed.categories){
      parsed.categories.forEach(c => {
        if(!c.icon) c.icon = '📁';
        if(!c.type) {
            const inc = ['Accounts Receivable', 'Allowance', 'Salary', 'Bonus'];
            const both = ['Adjustment'];
            if(inc.includes(c.category)) c.type = 'income';
            else if(both.includes(c.category)) c.type = 'both';
            else c.type = 'expense';
        }
      });
    }
    if(!parsed.recentEmojis) {
      parsed.recentEmojis = ['📁', '🍽️', '🚗', '🎯', '🧺', '👕', '💵', '✏️'];
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

  /* ============ THEME ENGINE ============ */
  function initTheme() {
    const saved = localStorage.getItem('mm_theme');
    if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    updateThemeIcon();
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem('mm_theme', target);
    updateThemeIcon();
  }
  function updateThemeIcon() {
    const btn = document.getElementById('btnThemeToggle');
    if(!btn) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark ? icon('sun') : icon('moon');
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
          <p class="panel-title">Expenses by Subcategory</p>
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
            ${state.accounts.length === 0 ? emptyHtml('No accounts yet. Click "Add Account" to get started.') : ''}
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
    const amt = isTransfer ? t.expense : (isIncome ? tSeluruh antarmuka web telah dikembalikan ke bahasa Inggris. Pada halaman Dashboard, kini juga terdapat satu bagian tambahan untuk menampilkan grafik **Expenses by Subcategory** (Pengeluaran per Subkategori).

Silakan timpa ketiga file tersebut dengan kode di bawah ini:

### 1. `index.html`
Perbarui file ini untuk mengembalikan semua teks antarmuka (termasuk modal) ke bahasa Inggris.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Money Manager</title>
<meta name="description" content="Personal finance manager dashboard — income, expenses, balances, and budgets by category.">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="paper-texture"></div>
<div id="app">

  <header class="topbar">
    <div class="brand">
      <div class="brand-mark">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 012-2h13a1 1 0 011 1v2M3 7v10a2 2 0 002 2h14a1 1 0 001-1V9a1 1 0 00-1-1H5a2 2 0 01-2-2z"/><circle cx="16" cy="14" r="1.4"/></svg>
      </div>
      <div class="brand-text">
        <h1>Money Manager</h1>
        <p>Personal Finance Ledger</p>
      </div>
      <button class="icon-btn theme-btn" id="btnThemeToggle" title="Toggle Dark/Light Mode">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="moon-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      </button>
    </div>
    <div class="topbar-actions">
      <button class="icon-btn" id="btnExport" title="Export data (.json)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg></button>
      <button class="icon-btn" id="btnImport" title="Import data (.json)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V9m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg></button>
      <button class="icon-btn" id="btnReset" title="Reset to demo data"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0115.36-6.36M21 12a9 9 0 01-15.36 6.36"/><path d="M3 4v5h5M21 20v-5h-5"/></svg></button>
      <input type="file" id="importFileInput" accept="application/json" hidden>
    </div>
  </header>

  <nav class="tab-nav-wrap"><div class="tab-nav" id="tabNav"></div></nav>

  <main>
    <section class="view" id="view-dashboard"></section>
    <section class="view" id="view-transactions"></section>
    <section class="view" id="view-balance"></section>
    <section class="view" id="view-budgets"></section>
    <section class="view" id="view-categories"></section>
    <section class="view" id="view-accounts"></section>
  </main>

  <footer>Money Manager · data saved locally on this device</footer>
</div>

<!-- Transaction Modal -->
<div class="modal-overlay" id="txnModalOverlay">
  <div class="modal">
    <div class="modal-head">
      <h3 id="txnModalTitle">Add Transaction</h3>
      <button class="icon-btn" id="btnTxnClose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="modal-body">
      <div class="type-toggle">
        <button type="button" data-type="expense" class="active">Expense</button>
        <button type="button" data-type="income">Income</button>
        <button type="button" data-type="transfer">Transfer</button>
      </div>
      <div class="form-row">
        <div class="field"><label>Date</label><input type="date" class="input" id="txnDate"></div>
        <div class="field"><label>Account</label><select class="input" id="txnAccount"></select></div>
      </div>
      <div class="form-row" id="rowCategory">
        <div class="field"><label>Category</label><select class="input" id="txnCategory"></select></div>
        <div class="field"><label>Subcategory</label><select class="input" id="txnSubcategory"></select></div>
      </div>
      <div class="form-row" id="rowTransfer" style="display:none">
        <div class="field"><label>Transfer To</label><select class="input" id="txnTransferTo"></select></div>
      </div>
      <div class="field"><label>Note</label><input type="text" class="input" id="txnNote" placeholder="e.g. Lunch with friends"></div>
      <div class="field"><label id="amountLabel">Amount</label><input type="number" class="input" id="txnAmount" placeholder="0" min="0"></div>
    </div>
    <div class="modal-foot">
      <button class="btn" id="btnTxnCancel">Cancel</button>
      <button class="btn btn-primary" id="btnTxnSave">Save</button>
    </div>
  </div>
</div>

<!-- Account Modal -->
<div class="modal-overlay" id="acctModalOverlay">
  <div class="modal">
    <div class="modal-head">
      <h3 id="acctModalTitle">Add Account</h3>
      <button class="icon-btn" id="btnAcctClose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="modal-body">
      <div class="field"><label>Account Name</label><input type="text" class="input" id="acctName" placeholder="e.g. Main Wallet"></div>
      <div class="form-row">
        <div class="field"><label>Type</label>
          <select class="input" id="acctType">
            <option value="bank">Bank</option>
            <option value="digital">Digital Bank</option>
            <option value="ewallet">E-Wallet</option>
            <option value="cash">Cash</option>
          </select>
        </div>
        <div class="field"><label>Current Balance</label><input type="number" class="input" id="acctBalance" placeholder="0"></div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn" id="btnAcctCancel">Cancel</button>
      <button class="btn btn-primary" id="btnAcctSave">Save</button>
    </div>
  </div>
</div>

<!-- Budget Modal -->
<div class="modal-overlay" id="budgetModalOverlay">
  <div class="modal">
    <div class="modal-head">
      <h3 id="budgetModalTitle">Add Budget</h3>
      <button class="icon-btn" id="btnBudgetClose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="modal-body">
      <div class="form-row">
        <div class="field"><label>Category</label><select class="input" id="budgetCategory"></select></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Subcategory</label><select class="input" id="budgetSubcategory"></select></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Monthly Limit Amount</label><input type="number" class="input" id="budgetAmount" placeholder="e.g. 500000" min="0"></div>
      </div>
      <input type="hidden" id="budgetOldKey">
    </div>
    <div class="modal-foot">
      <button class="btn" id="btnBudgetCancel">Cancel</button>
      <button class="btn btn-primary" id="btnBudgetSave">Save</button>
    </div>
  </div>
</div>

<!-- Category Modal -->
<div class="modal-overlay" id="catModalOverlay">
  <div class="modal" style="overflow: visible;">
    <div class="modal-head">
      <h3 id="catModalTitle">Add Category</h3>
      <button class="icon-btn" id="btnCatClose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="modal-body" style="overflow: visible;">
      <div class="field"><label>Category Name</label><input type="text" class="input" id="catName" placeholder="e.g. Shopping"></div>
      <div class="form-row">
        <div class="field">
          <label>Category Type</label>
          <select class="input" id="catType">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div class="field">
          <label>Icon</label>
          <div class="emoji-dropdown-wrap">
            <button type="button" class="input emoji-selector-btn" id="btnCatIcon">📁</button>
            <input type="hidden" id="catIconValue" value="📁">
            <div class="emoji-popover" id="catEmojiPopover">
              <div class="recent-emojis-wrap">
                <div class="recent-emojis-title">Recent</div>
                <div class="recent-emojis-list" id="catRecentList"></div>
              </div>
              <div id="catPickerContainer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn" id="btnCatCancel">Cancel</button>
      <button class="btn btn-primary" id="btnCatSave">Save</button>
    </div>
  </div>
</div>

<!-- Subcategory Modal -->
<div class="modal-overlay" id="subModalOverlay">
  <div class="modal" style="overflow: visible;">
    <div class="modal-head">
      <h3 id="subModalTitle">Add Subcategory</h3>
      <button class="icon-btn" id="btnSubClose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="modal-body" style="overflow: visible;">
      <div class="field"><label>Subcategory Name</label><input type="text" class="input" id="subName" placeholder="e.g. Groceries"></div>
      <div class="field">
        <label>Subcategory Icon</label>
        <div class="emoji-dropdown-wrap">
          <button type="button" class="input emoji-selector-btn" id="btnSubIcon">📁</button>
          <input type="hidden" id="subIconValue" value="📁">
          <div class="emoji-popover" id="subEmojiPopover">
            <div class="recent-emojis-wrap">
              <div class="recent-emojis-title">Recent</div>
              <div class="recent-emojis-list" id="subRecentList"></div>
            </div>
            <div id="subPickerContainer"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn" id="btnSubCancel">Cancel</button>
      <button class="btn btn-primary" id="btnSubSave">Save</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<!-- EmojiMart Web Component -->
<script src="[https://cdn.jsdelivr.net/npm/emoji-mart@latest/dist/browser.js](https://cdn.jsdelivr.net/npm/emoji-mart@latest/dist/browser.js)"></script>
<script src="app.js"></script>
</body>
</html>
