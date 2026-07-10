/* ============================================================
   MONEY MANAGER — APP LOGIC WITH FIREBASE CLOUD SYNC
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA55-zN6AE4jP8JaARRPVtNA9Xdk4PVSQA",
  authDomain: "money-manager-7777.firebaseapp.com",
  projectId: "money-manager-7777",
  storageBucket: "money-manager-7777.firebasestorage.app",
  messagingSenderId: "62200136247",
  appId: "1:62200136247:web:8776d1102d3c418d5bb5b2",
  measurementId: "G-8TF14TN8EF"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);
const googleProvider = new GoogleAuthProvider();

let currentUser = null;
let cloudSyncTimeout = null;

// --- Default Data / Initial Data ---
const SEED = {
  "currency": "IDR",
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
const ACCOUNT_ICONS = { bank:'🏦', digital: '📱', ewallet:'💳', cash:'💵' };
const CHART_PALETTE = ['#5C9A66','#3C7247','#8FAE6A','#C4A24B','#BD5B3C','#8B6BA8','#4B85A6','#B0784F','#6D8C63','#A6555F','#5E9C8C','#9C8A5C','#7A9E4C','#C97F9E','#5A7DA6','#A88B4C'];
const MONTHS_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

// Static conversion rates against IDR (Baseline)
const CURRENCIES = {
  IDR: { rate: 1, locale: 'id-ID' },
  USD: { rate: 16200, locale: 'en-US' },
  EUR: { rate: 17500, locale: 'de-DE' },
  JPY: { rate: 105, locale: 'ja-JP' },
  KRW: { rate: 12, locale: 'ko-KR' },
  CNY: { rate: 2250, locale: 'zh-CN' }
};

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
let state = loadStateLocal();
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
let selectedCatMonth = null;
let selectedSubCatMonth = null;

function shiftMonth(yyyyMM, offset) {
  let [y, m] = yyyyMM.split('-').map(Number);
  m += offset;
  if (m < 1) { m = 12; y -= 1; }
  if (m > 12) { m = 1; y += 1; }
  return `${y}-${String(m).padStart(2, '0')}`;
}

function loadStateLocal(){
  let parsed = JSON.parse(JSON.stringify(SEED));
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const userState = JSON.parse(raw);
      if(userState && Array.isArray(userState.transactions)) parsed = userState;
    }
  }catch(e){ console.warn('Failed to load saved data', e); }
  
  if(!parsed.currency) parsed.currency = 'IDR';

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

function saveState(){ 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); 
  
  if (currentUser) {
    clearTimeout(cloudSyncTimeout);
    cloudSyncTimeout = setTimeout(() => {
      setDoc(doc(db, 'users', currentUser.uid), { appData: JSON.stringify(state) })
        .then(() => console.log('✅ Synced with Cloud'))
        .catch(e => console.error("Cloud sync error:", e));
    }, 1500);
  }
}

/* ============ FIREBASE AUTH LOGIC ============ */
onAuthStateChanged(auth, async (user) => {
  const btnAuth = document.getElementById('btnAuthOpen');
  if (user) {
    currentUser = user;
    document.getElementById('authLoggedOut').style.display = 'none';
    document.getElementById('authLoggedIn').style.display = 'block';
    document.getElementById('authUserName').textContent = user.displayName || 'User';
    document.getElementById('authUserEmail').textContent = user.email;
    btnAuth.style.color = '#fff';
    btnAuth.style.background = 'var(--primary)';
    
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists() && docSnap.data().appData) {
        const cloudData = JSON.parse(docSnap.data().appData);
        if(cloudData && Array.isArray(cloudData.transactions)) {
           state = cloudData;
           if(!state.currency) state.currency = 'IDR';
           localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); 
           document.getElementById('currencySelect').value = state.currency;
           renderCurrentTab();
           toast('Data successfully fetched from Cloud ☁️');
        }
      } else {
        await setDoc(docRef, { appData: JSON.stringify(state) });
        toast('Local data backing up to Cloud ☁️');
      }
    } catch (e) {
      console.error(e);
      toast('Failed to sync Cloud data');
    }
  } else {
    currentUser = null;
    document.getElementById('authLoggedOut').style.display = 'block';
    document.getElementById('authLoggedIn').style.display = 'none';
    btnAuth.style.color = 'var(--primary)';
    btnAuth.style.background = 'transparent';
  }
});

/* ============ HELPERS ============ */
function fmtCurrency(n){
  n = Number(n) || 0;
  const curr = state.currency || 'IDR';
  const config = CURRENCIES[curr] || CURRENCIES['IDR'];
  
  // Calculate converted amount
  const converted = n / config.rate;
  
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: curr,
    minimumFractionDigits: (curr === 'IDR' || curr === 'JPY' || curr === 'KRW') ? 0 : 2,
    maximumFractionDigits: (curr === 'IDR' || curr === 'JPY' || curr === 'KRW') ? 0 : 2
  }).format(converted);
}

function fmtDateShort(d){
  const [y,m,day] = d.split('-').map(Number);
  return `${MONTHS_EN[m-1]} ${day}, ${y}`;
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
  const s = str.trim();
  const spaceIdx = s.indexOf(' ');
  
  if (spaceIdx > 0 && spaceIdx <= 7) {
    const possibleIcon = s.slice(0, spaceIdx);
    if (!/[a-zA-Z0-9]/.test(possibleIcon)) {
      return { icon: possibleIcon, name: s.slice(spaceIdx).trim() };
    }
  }
  
  const firstCharArr = Array.from(s);
  if (firstCharArr.length > 0) {
     const firstChar = firstCharArr[0];
     if (!/[a-zA-Z0-9]/.test(firstChar)) {
         return { icon: firstChar, name: s.slice(firstChar.length).trim() };
     }
  }
  
  return { icon: '📁', name: s };
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
  { id:'balance', label:'Balance' },
  { id:'budgets', label:'Budgets' },
  { id:'categories', label:'Categories' },
  { id:'accounts', label:'Accounts' },
];
function renderNav(){
  const nav = document.getElementById('tabNav');
  nav.innerHTML = TABS.map(t=> `<button class="tab-btn ${t.id===currentTab?'active':''}" data-tab="${t.id}">${t.label}</button>`).join('');
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
  
  // Set default bulan ke bulan saat ini jika belum dipilih
  if (!selectedCatMonth) selectedCatMonth = nowKey;
  if (!selectedSubCatMonth) selectedSubCatMonth = nowKey;

  // Filter transaksi untuk ringkasan atas (selalu bulan saat ini)
  const monthTx = enriched.filter(t=> t.date.slice(0,7)===nowKey);
  const income = monthTx.filter(t=>!t.transferTo).reduce((s,t)=>s+(t.income||0),0);
  const expense = monthTx.filter(t=>!t.transferTo).reduce((s,t)=>s+(t.expense||0),0);
  const net = income-expense;

  // Filter transaksi khusus untuk grafik
  const catMonthTx = enriched.filter(t=> t.date.slice(0,7)===selectedCatMonth);
  const subCatMonthTx = enriched.filter(t=> t.date.slice(0,7)===selectedSubCatMonth);

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
        <p class="panel-sub">Income vs expense, last 6 months</p>
        ${renderMonthlyBars(monthlyAggregate(enriched).slice(-6))}
        <div class="chart-legend">
          <div class="legend-item"><span class="legend-swatch" style="background:var(--income)"></span>Income</div>
          <div class="legend-item"><span class="legend-swatch" style="background:var(--expense)"></span>Expense</div>
        </div>
      </div>
      <div class="card card-pad">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
          <div>
            <p class="panel-title">Expenses by Category</p>
            <p class="panel-sub">Month ${fmtMonthLabel(selectedCatMonth)}</p>
          </div>
          <input type="month" id="catMonthPicker" class="month-picker-btn" value="${selectedCatMonth}" title="Select Month">
        </div>
        ${renderCategoryDonutBlock(catMonthTx)}
      </div>
    </div>

    <div class="dash-grid">
      <div class="card card-pad">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
          <div>
            <p class="panel-title">Expenses by Subcategory</p>
            <p class="panel-sub">Extra details for ${fmtMonthLabel(selectedSubCatMonth)}</p>
          </div>
          <input type="month" id="subCatMonthPicker" class="month-picker-btn" value="${selectedSubCatMonth}" title="Select Month">
        </div>
        ${renderSubcategoryDonutBlock(subCatMonthTx)}
        ${renderSubcategoryBarBlock(subCatMonthTx)}
      </div>
      <div class="card card-pad">
        <p class="panel-title">Balance per Account</p>
        <p class="panel-sub">Manage accounts in the 'Accounts' menu</p>
        <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
          ${state.accounts.slice(0, 7).map((a, i) => {
            const bal = accBal[a.name] || 0;
            const pct = (total > 0 && bal > 0) ? Math.min(100, Math.round((bal/total)*100)) : 0;
            const color = CHART_PALETTE[i % CHART_PALETTE.length];
            return '<div class="acct-card dash-acct-card" style="padding:14px 16px; cursor:pointer;" title="Go to Accounts">' +
              '<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">' +
                '<div style="display:flex; align-items:center; gap:12px;">' +
                  '<div class="acct-icon" style="width:36px; height:36px; font-size:16px;">' + (ACCOUNT_ICONS[a.type]||'💳') + '</div>' +
                  '<div style="display:flex; flex-direction:column; gap:3px;">' +
                    '<div class="acct-name" style="font-size:14.5px; line-height:1;">' + esc(a.name) + '</div>' +
                    '<div style="font-size:10.5px; color:var(--ink-muted); text-transform:uppercase; font-weight:700; letter-spacing:0.05em; line-height:1;">' + a.type + '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="acct-balance" style="font-size:15px; font-weight:600;">' + fmtCurrency(bal) + '</div>' +
              '</div>' +
              '<div class="bar-track" style="height:6px; background:var(--paper-2); border-radius:3px; overflow:hidden;">' +
                '<div style="height:100%; width:' + pct + '%; background:' + color + '; border-radius:3px; transition: width 0.4s ease;"></div>' +
              '</div>' +
            '</div>';
          }).join('')}
          ${state.accounts.length === 0 ? emptyHtml('No accounts yet.') : ''}
        </div>
      </div>
    </div>

    <div class="dash-grid" style="grid-template-columns: 1fr;">
      <div class="card card-pad">
        <p class="panel-title">Recent Transactions</p>
        <p class="panel-sub">Latest 10 transactions overall</p>
        <div>
          ${enriched.slice(-10).reverse().map(t=> recentItemHtmlDash(t)).join('') || emptyHtml('No transactions yet')}
        </div>
      </div>
    </div>
  `;
  
  // Event Listeners untuk Kalender Kategori & Subkategori
  document.getElementById('catMonthPicker').addEventListener('change', (e) => {
    if(e.target.value) {
      selectedCatMonth = e.target.value;
      renderDashboard();
    }
  });

  document.getElementById('subCatMonthPicker').addEventListener('change', (e) => {
    if(e.target.value) {
      selectedSubCatMonth = e.target.value;
      renderDashboard();
    }
  });

  // Event listener untuk menuju page Accounts
  el.querySelectorAll('.dash-acct-card').forEach(card => {
    card.addEventListener('click', () => switchTab('accounts'));
  });

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
  if(entries.length===0) return emptyHtml('No expenses yet');
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

function renderSubcategoryDonutBlock(monthTx){
  const bySubCat = {};
  monthTx.filter(t=>!t.transferTo && t.expense>0).forEach(t=>{
    const key = t.subcategory || t.category;
    bySubCat[key] = (bySubCat[key]||0) + t.expense;
  });
  const entries = Object.entries(bySubCat).sort((a,b)=>b[1]-a[1]);
  if(entries.length===0) return emptyHtml('No expenses yet');
  const top = entries.slice(0,7);
  const data = top.map(([sub,val],i)=> ({label:sub, value:val, color:CHART_PALETTE[(i+5)%CHART_PALETTE.length]}));
  const total = entries.reduce((s,[,v])=>s+v,0);
  return `<div style="display:flex; gap:20px; align-items:center; flex-wrap:wrap;">
    ${renderDonut(data,140)}
    <div style="flex:1; min-width:160px;">
      ${data.map(d=>{
        const parts = splitSub(d.label);
        return `<div class="legend-item" style="justify-content:space-between; margin-bottom:6px;">
        <span style="display:flex;align-items:center;gap:7px;"><span class="legend-swatch" style="background:${d.color}"></span>${parts.icon} ${esc(parts.name)}</span>
        <span style="font-family:var(--font-mono);font-weight:600;color:var(--ink)">${Math.round(d.value/total*100)}%</span>
      </div>`}).join('')}
    </div>
  </div>`;
}

function renderSubcategoryBarBlock(monthTx){
  const bySubCat = {};
  monthTx.filter(t=>!t.transferTo && t.expense>0).forEach(t=>{
    const key = t.subcategory || t.category;
    bySubCat[key] = (bySubCat[key]||0) + t.expense;
  });
  const entries = Object.entries(bySubCat).sort((a,b)=>b[1]-a[1]);
  if(entries.length===0) return '';
  const top = entries.slice(0,7);
  const max = top[0][1];
  
  let html = '<div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-soft); display: flex; flex-direction: column; gap: 12px;">';
  html += '<p class="panel-title" style="font-size:13.5px; margin-bottom:4px;">Comparison Details</p>';
  
  top.forEach(([sub,val], i) => {
    const parts = splitSub(sub);
    const pct = max > 0 ? Math.round((val/max)*100) : 0;
    const color = CHART_PALETTE[(i+5)%CHART_PALETTE.length];
    html += `
      <div style="display:flex; flex-direction:column; gap:6px;">
        <div style="display:flex; justify-content:space-between; font-size:12.5px; font-weight: 500;">
          <span>${parts.icon} ${esc(parts.name)}</span>
          <span style="font-family:var(--font-mono); color:var(--ink);">${fmtCurrency(val)}</span>
        </div>
        <div class="bar-track" style="height:6px; background:var(--paper-2); border-radius:3px; overflow:hidden;">
          <div style="height:100%; width:${pct}%; background:${color}; border-radius:3px; transition: width 0.4s ease;"></div>
        </div>
      </div>
    `;
  });
  html += '</div>';
  return html;
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
            <td><button class="btn btn-ghost btn-sm" id="fClear" style="padding:4px 6px;">Reset</button></td>
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
  // KESALAHAN SEBELUMNYA ADA DI BARIS BAWAH INI (Kelebihan 1 tutup kurung)
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
  if(!confirm('Delete this transaction? This action cannot be undone.')) return;
  state.transactions = state.transactions.filter(t=>t.id!==id);
  saveState();
  renderTransactions();
  toast('Transaction deleted');
}

/* ============ TRANSACTION MODAL ============ */
function openTxnModal(id, isDuplicate = false){
  if(state.accounts.length === 0) { toast('Create an account first'); return; }

  editingTxnId = isDuplicate ? null : (id || null);
  const t = id ? state.transactions.find(x=>x.id===id) : null;
  txnType = t ? (t.transferTo ? 'transfer' : (t.income>0 ? 'income' : 'expense')) : 'expense';

  document.getElementById('txnModalTitle').textContent = isDuplicate ? 'Duplicate Transaction' : (id ? 'Edit Transaction' : 'Add Transaction');
  document.getElementById('txnDate').value = t ? t.date : todayStr();
  document.getElementById('txnAccount').innerHTML = state.accounts.map(a=>`<option value="${esc(a.name)}">${esc(a.name)}</option>`).join('');
  document.getElementById('txnAccount').value = t ? t.account : (state.accounts[0] ? state.accounts[0].name : '');
  document.getElementById('txnNote').value = t ? (t.note||'') : '';

  // Get active currency rate
  const rate = CURRENCIES[state.currency || 'IDR'].rate;
  if(t) {
    const rawAmt = t.transferTo ? t.expense : (t.income || t.expense || 0);
    const val = rawAmt / rate;
    document.getElementById('txnAmount').value = val % 1 === 0 ? val : val.toFixed(2);
  } else {
    document.getElementById('txnAmount').value = '';
  }

  setTxnType(txnType);

  if(t) {
    document.getElementById('txnCategory').value = t.category;
    populateSubcategorySelect(t.category, t.subcategory);
  }

  document.getElementById('txnTransferTo').innerHTML = state.accounts.map(a=>`<option value="${esc(a.name)}">${esc(a.name)}</option>`).join('');
  if(t && t.transferTo) document.getElementById('txnTransferTo').value = t.transferTo;

  document.getElementById('txnModalOverlay').classList.add('open');
  document.getElementById('txnDate').focus();
}
function closeTxnModal(){ document.getElementById('txnModalOverlay').classList.remove('open'); }

function populateCategorySelect(selected, type = txnType){
  const sel = document.getElementById('txnCategory');
  let filtered = state.categories;
  
  if (type === 'expense') {
      filtered = state.categories.filter(c => c.type === 'expense' || c.type === 'both');
  } else if (type === 'income') {
      filtered = state.categories.filter(c => c.type === 'income' || c.type === 'both');
  }

  sel.innerHTML = filtered.map(c=>`<option value="${esc(c.category)}">${catIcon(c.category)} ${esc(c.category)}</option>`).join('');
  
  if(selected && filtered.some(c => c.category === selected)) {
      sel.value = selected;
  } else if (filtered.length > 0) {
      sel.value = filtered[0].category;
  }
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

  if (type !== 'transfer') {
    populateCategorySelect(document.getElementById('txnCategory').value, type);
    populateSubcategorySelect(document.getElementById('txnCategory').value);
  }
}

function saveTxnForm(){
  const date = document.getElementById('txnDate').value;
  const account = document.getElementById('txnAccount').value;
  const note = document.getElementById('txnNote').value.trim();
  
  // Calculate value back to IDR to store in database
  const rate = CURRENCIES[state.currency || 'IDR'].rate;
  const amount = (Number(document.getElementById('txnAmount').value) || 0) * rate;

  if(!date){ toast('Date is required'); return; }
  if(amount<=0){ toast('Amount must be greater than 0'); return; }

  let payload = { date, account, note, category:'', subcategory:'', expense:0, income:0, transferTo:'' };
  if(txnType==='transfer'){
    const to = document.getElementById('txnTransferTo').value;
    if(to===account){ toast('Destination account must be different from source account'); return; }
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
      <div><h2>Monthly Balance</h2><p class="sub">Cash flow summary per month, automatically calculated</p></div>
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
          <th>Month</th><th style="text-align:right">Start Balance</th><th style="text-align:right">Income</th>
          <th style="text-align:right">Expense</th><th style="text-align:right">Net Cash Flow</th><th style="text-align:right">End Balance</th>
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
  
  const budgetKeys = Object.keys(state.budgets || {});
  const spendTracker = {};
  budgetKeys.forEach(k => spendTracker[k] = 0);

  enriched.filter(t=>t.date.slice(0,7)===nowKey && !t.transferTo && t.expense > 0).forEach(t=>{
    if (spendTracker[t.category] !== undefined) spendTracker[t.category] += t.expense;
    const subKey = t.category + '|' + t.subcategory;
    if (spendTracker[subKey] !== undefined) spendTracker[subKey] += t.expense;
  });

  const el = document.getElementById('view-budgets');
  el.innerHTML = `
    <div class="section-head">
      <div><h2>Budgets</h2><p class="sub">Track monthly spending limits · ${fmtMonthLabel(nowKey)}</p></div>
      <div class="section-head-actions">
        <button class="btn btn-primary" id="btnAddBudget">${icon('plus')}Add Budget</button>
      </div>
    </div>

    <div class="card card-pad" style="margin-bottom:20px;">
      <p class="panel-title">Active Budgets</p>
      <p class="panel-sub">Track total category spending or target specific subcategories.</p>
      <div class="budget-list">
        ${budgetKeys.length > 0 ? budgetKeys.map(k=>{
          const budget = state.budgets[k];
          const spend = spendTracker[k] || 0;
          const pct = budget>0 ? Math.min(100, Math.round(spend/budget*100)) : 0;
          const over = budget>0 && spend>budget;
          
          let label = k;
          let cIcon = '📁';
          if(k.includes('|')) {
              const [c, s] = k.split('|');
              const parts = splitSub(s);
              cIcon = parts.icon;
              label = parts.name;
          } else {
              cIcon = catIcon(k);
          }

          return `<div class="budget-row">
            <div class="budget-top" style="align-items: center;">
              <span class="cat-label">${cIcon} ${esc(label)}</span>
              <div style="display:flex; align-items:center;">
                <span class="amounts">${fmtCurrency(spend)} / ${fmtCurrency(budget)}</span>
                <div class="row-actions">
                  <button data-editbudget="${esc(k)}" title="Edit Limit">${icon('edit')}</button>
                  <button data-delbudget="${esc(k)}" class="del" title="Delete Budget">${icon('trash')}</button>
                </div>
              </div>
            </div>
            <div class="bar-track"><div class="bar-fill ${over?'over':''}" style="width:${pct}%"></div></div>
          </div>`;
        }).join('') : emptyHtml('No budgets yet. Click "Add Budget" to start.')}
      </div>
    </div>
  `;
  
  document.getElementById('btnAddBudget').addEventListener('click', () => openBudgetModal());
  el.querySelectorAll('[data-editbudget]').forEach(b => b.addEventListener('click', () => openBudgetModal(b.dataset.editbudget)));
  el.querySelectorAll('[data-delbudget]').forEach(b => b.addEventListener('click', () => deleteBudget(b.dataset.delbudget)));
}

function openBudgetModal(key = null) {
  if(state.categories.length === 0) { toast('Create a category first'); return; }

  document.getElementById('budgetModalTitle').textContent = key ? 'Edit Budget' : 'Add Budget';
  document.getElementById('budgetOldKey').value = key || '';
  
  const selCat = document.getElementById('budgetCategory');
  const expCats = state.categories.filter(c => c.type === 'expense' || c.type === 'both');
  selCat.innerHTML = expCats.map(c=>`<option value="${esc(c.category)}">${catIcon(c.category)} ${esc(c.category)}</option>`).join('');
  
  let targetCat = expCats[0] ? expCats[0].category : '';
  let targetSub = '';
  
  const rate = CURRENCIES[state.currency || 'IDR'].rate;
  let amount = '';
  
  if (key) {
    if (key.includes('|')) {
        const parts = key.split('|');
        targetCat = parts[0];
        targetSub = parts.slice(1).join('|');
    } else {
        targetCat = key;
    }
    
    // Convert back from IDR to active currency for editing
    const rawAmt = state.budgets[key] || 0;
    const val = rawAmt / rate;
    amount = val % 1 === 0 ? val : val.toFixed(2);
  }
  
  if (targetCat) selCat.value = targetCat;
  
  const popSub = (cat) => {
    const catObj = state.categories.find(c=>c.category===cat);
    const selSub = document.getElementById('budgetSubcategory');
    const subs = catObj ? catObj.subcategories : [];
    selSub.innerHTML = `<option value="">-- All Subcategories --</option>` + subs.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('');
  };
  
  popSub(targetCat);
  if (targetSub) document.getElementById('budgetSubcategory').value = targetSub;
  
  selCat.onchange = (e) => popSub(e.target.value);
  
  document.getElementById('budgetAmount').value = amount;
  document.getElementById('budgetModalOverlay').classList.add('open');
}

function closeBudgetModal() {
  document.getElementById('budgetModalOverlay').classList.remove('open');
}

function saveBudgetForm() {
  const oldKey = document.getElementById('budgetOldKey').value;
  const cat = document.getElementById('budgetCategory').value;
  const sub = document.getElementById('budgetSubcategory').value;
  
  const rate = CURRENCIES[state.currency || 'IDR'].rate;
  const amount = (Number(document.getElementById('budgetAmount').value) || 0) * rate;
  
  if (amount <= 0) { toast('Amount must be greater than 0'); return; }
  
  const newKey = sub ? `${cat}|${sub}` : cat;
  if (!state.budgets) state.budgets = {};
  
  if (oldKey && oldKey !== newKey) {
      if (state.budgets[newKey] !== undefined) {
          toast('Budget for this target already exists');
          return;
      }
      delete state.budgets[oldKey];
  } else if (!oldKey && state.budgets[newKey] !== undefined) {
      toast('Budget for this target already exists');
      return;
  }
  
  state.budgets[newKey] = amount;
  saveState();
  closeBudgetModal();
  renderBudgets();
  toast('Budget saved');
}

function deleteBudget(key) {
  if(!confirm('Delete this budget tracker?')) return;
  delete state.budgets[key];
  saveState();
  renderBudgets();
  toast('Budget deleted');
}

/* ============ CATEGORIES ============ */
function renderCategories(){
  const el = document.getElementById('view-categories');
  el.innerHTML = `
    <div class="section-head">
      <div><h2>Categories</h2><p class="sub">Manage and organize your transaction categories</p></div>
      <div class="section-head-actions">
        <button class="btn btn-primary" id="btnAddCat">${icon('plus')}Add Category</button>
      </div>
    </div>

    <div id="catList" class="card card-pad">
      ${state.categories.map(c=>{
        let typeLabel = c.type === 'expense' ? 'Expense' : (c.type === 'income' ? 'Income' : 'Both');
        return `
        <div class="cat-section">
          <h4>
            <span class="cat-icon-edit" data-editcat="${esc(c.category)}" title="Edit Category">${catIcon(c.category)}</span>
            ${esc(c.category)} <span class="cat-type-tag">${typeLabel}</span>
            <div class="cat-actions">
              <button class="icon-btn-micro" data-addsub="${esc(c.category)}" title="Add Subcategory">${icon('plus')}</button>
              <button class="icon-btn-micro" data-editcat="${esc(c.category)}" title="Rename Category">${icon('edit')}</button>
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
            `}).join('') || '<span class="sub-chip" style="opacity:.6">No subcategories yet</span>'}
          </div>
        </div>
      `}).join('')}
    </div>
  `;

  document.getElementById('btnAddCat').addEventListener('click', ()=> openCatModal());
  el.querySelectorAll('[data-editcat]').forEach(b=> b.addEventListener('click', ()=> openCatModal(b.dataset.editcat)));
  el.querySelectorAll('[data-dupcat]').forEach(b=> b.addEventListener('click', ()=> openCatModal(b.dataset.dupcat, true)));
  el.querySelectorAll('[data-delcat]').forEach(b=> b.addEventListener('click', ()=> deleteCategory(b.dataset.delcat)));
  
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

function renderRecentEmojis() {
  const recents = state.recentEmojis || ['📁', '🍽️', '🚗', '🎯', '🧺', '👕', '💵', '✏️'];
  const html = recents.map(e => `<button type="button" class="recent-btn" onclick="window.selectRecentEmoji('${e}')">${e}</button>`).join('');
  
  const catList = document.getElementById('catRecentList');
  const subList = document.getElementById('subRecentList');
  if (catList) catList.innerHTML = html;
  if (subList) subList.innerHTML = html;
}

window.selectRecentEmoji = function(emoji) {
  if (document.getElementById('catEmojiPopover').classList.contains('show')) {
    handleEmojiSelect('btnCatIcon', 'catIconValue', emoji);
    document.getElementById('catEmojiPopover').classList.remove('show');
  } else if (document.getElementById('subEmojiPopover').classList.contains('show')) {
    handleEmojiSelect('btnSubIcon', 'subIconValue', emoji);
    document.getElementById('subEmojiPopover').classList.remove('show');
  }
};

function handleEmojiSelect(btnId, inputId, emoji) {
  setEmojiPicker(btnId, inputId, emoji);
  
  if (!state.recentEmojis) state.recentEmojis = [];
  state.recentEmojis = [emoji, ...state.recentEmojis.filter(e => e !== emoji)].slice(0, 15);
  saveState();
  renderRecentEmojis();
}

function initEmojiPicker() {
  if(window.EmojiMart) {
    const categoriesNoFrequentAndFlags = ['people', 'nature', 'foods', 'activity', 'places', 'objects', 'symbols'];
    
    const catPickerOptions = {
      onEmojiSelect: (e) => {
        handleEmojiSelect('btnCatIcon', 'catIconValue', e.native);
        document.getElementById('catEmojiPopover').classList.remove('show');
      },
      theme: 'light',
      previewPosition: 'none',
      skinTonePosition: 'none',
      categories: categoriesNoFrequentAndFlags
    };
    const catPicker = new EmojiMart.Picker(catPickerOptions);
    document.getElementById('catPickerContainer').appendChild(catPicker);

    const subPickerOptions = {
      onEmojiSelect: (e) => {
        handleEmojiSelect('btnSubIcon', 'subIconValue', e.native);
        document.getElementById('subEmojiPopover').classList.remove('show');
      },
      theme: 'light',
      previewPosition: 'none',
      skinTonePosition: 'none',
      categories: categoriesNoFrequentAndFlags
    };
    const subPicker = new EmojiMart.Picker(subPickerOptions);
    document.getElementById('subPickerContainer').appendChild(subPicker);

    renderRecentEmojis();
  }
}

function openCatModal(name = null, isDuplicate = false) {
  editingCatOldName = isDuplicate ? null : name;
  duplicatingCatName = isDuplicate ? name : null;

  const c = name ? state.categories.find(x => x.category === name) : null;
  
  document.getElementById('catModalTitle').textContent = isDuplicate ? 'Duplicate Category' : (name ? 'Edit Category' : 'Add Category');
  
  let defaultName = '';
  if(c) defaultName = isDuplicate ? c.category + ' Copy' : c.category;
  document.getElementById('catName').value = defaultName;
  document.getElementById('catType').value = c ? (c.type || 'expense') : 'expense';
  
  const icon = c ? c.icon : '📁';
  document.getElementById('catIconValue').value = icon;
  document.getElementById('btnCatIcon').textContent = icon;

  document.getElementById('catModalOverlay').classList.add('open');
  document.getElementById('catName').focus();
  renderRecentEmojis();
}
function closeCatModal() { document.getElementById('catModalOverlay').classList.remove('open'); }

function saveCatForm() {
  const newName = document.getElementById('catName').value.trim();
  const newIcon = document.getElementById('catIconValue').value;
  const newType = document.getElementById('catType').value;

  if (!newName) { toast('Category name is required'); return; }

  if (editingCatOldName) {
    if (newName !== editingCatOldName && state.categories.some(c => c.category.toLowerCase() === newName.toLowerCase())) {
      toast('Category name already exists'); return;
    }
    const cat = state.categories.find(c => c.category === editingCatOldName);
    cat.category = newName;
    cat.icon = newIcon;
    cat.type = newType;

    if (state.budgets && editingCatOldName !== newName) {
        const oldKeys = Object.keys(state.budgets).filter(k => k === editingCatOldName || k.startsWith(editingCatOldName + '|'));
        oldKeys.forEach(k => {
            let newKey = newName;
            if (k.includes('|')) {
                newKey = newName + '|' + k.split('|')[1];
            }
            state.budgets[newKey] = state.budgets[k];
            delete state.budgets[k];
        });
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
    state.categories.push({ category: newName, icon: newIcon, type: newType, subcategories: subs });
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
  document.getElementById('subIconValue').value = icon;
  document.getElementById('btnSubIcon').textContent = icon;
  
  document.getElementById('subModalOverlay').classList.add('open');
  document.getElementById('subName').focus();
  renderRecentEmojis();
}
function closeSubModal() { document.getElementById('subModalOverlay').classList.remove('open'); }

function saveSubForm() {
  const name = document.getElementById('subName').value.trim();
  const icon = document.getElementById('subIconValue').value;
  if (!name) { toast('Subcategory name is required'); return; }

  const newSub = icon + ' ' + name;
  const cat = state.categories.find(c => c.category === targetCatForSub);
  if (!cat) return;

  if (editingSubOldName) {
    if (newSub !== editingSubOldName && cat.subcategories.includes(newSub)) { 
      toast('Subcategory already exists'); return; 
    }
    cat.subcategories = cat.subcategories.map(s => s === editingSubOldName ? newSub : s);
    
    const oldKey = targetCatForSub + '|' + editingSubOldName;
    const newKey = targetCatForSub + '|' + newSub;
    if (state.budgets && state.budgets[oldKey] !== undefined) {
        state.budgets[newKey] = state.budgets[oldKey];
        delete state.budgets[oldKey];
    }

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
  if (used) { toast('Failed: Category is currently used in transactions'); return; }
  if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
  
  state.categories = state.categories.filter(c => c.category !== name);
  if (state.budgets) {
      delete state.budgets[name];
      Object.keys(state.budgets).forEach(k => {
          if (k.startsWith(name + '|')) delete state.budgets[k];
      });
  }
  
  saveState(); renderCategories(); toast('Category deleted');
}

function deleteSubcategory(catName, subName) {
  const used = state.transactions.some(t => t.category === catName && t.subcategory === subName);
  if (used) { toast('Failed: Subcategory is currently used in transactions'); return; }
  if (!confirm(`Are you sure you want to delete subcategory "${subName}"?`)) return;
  
  const cat = state.categories.find(c => c.category === catName);
  if (cat) cat.subcategories = cat.subcategories.filter(s => s !== subName);
  
  const key = catName + '|' + subName;
  if (state.budgets) delete state.budgets[key];

  saveState(); renderCategories(); toast('Subcategory deleted');
}

/* ============ ACCOUNTS ============ */
function renderAccounts(){
  const { accBal } = computeLedger();
  const el = document.getElementById('view-accounts');
  el.innerHTML = `
    <div class="section-head">
      <div><h2>Accounts</h2><p class="sub">Balances are auto-calculated. Editing current balance offsets opening data.</p></div>
      <div class="section-head-actions">
        <button class="btn btn-primary" id="btnAddAcct">${icon('plus')}Add Account</button>
      </div>
    </div>
    <div class="acct-grid">
      ${state.accounts.map((a, i)=>`
        <div class="acct-card" data-acct="${esc(a.name)}" data-idx="${i}" draggable="true">
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
      ${state.accounts.length === 0 ? emptyHtml('No accounts yet. Click "Add Account" to start.') : ''}
    </div>
  `;
  
  document.getElementById('btnAddAcct').addEventListener('click', ()=> openAcctModal());
  el.querySelectorAll('[data-editacct]').forEach(b=> b.addEventListener('click', ()=> openAcctModal(b.dataset.editacct)));
  el.querySelectorAll('[data-dupacct]').forEach(b=> b.addEventListener('click', ()=> duplicateAcct(b.dataset.dupacct)));
  el.querySelectorAll('[data-delacct]').forEach(b=> b.addEventListener('click', ()=> deleteAcct(b.dataset.delacct)));

  // Drag and Drop Logic
  const cards = el.querySelectorAll('.acct-card');
  let dragSrcIdx = null;

  cards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
      dragSrcIdx = Number(card.dataset.idx);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', dragSrcIdx);
      setTimeout(() => card.classList.add('dragging'), 0);
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      cards.forEach(c => c.classList.remove('drag-over'));
    });
    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      return false;
    });
    card.addEventListener('dragenter', (e) => {
      e.preventDefault();
      if (Number(card.dataset.idx) !== dragSrcIdx) {
        card.classList.add('drag-over');
      }
    });
    card.addEventListener('dragleave', () => {
      card.classList.remove('drag-over');
    });
    card.addEventListener('drop', (e) => {
      e.stopPropagation();
      const targetIdx = Number(card.dataset.idx);
      if (dragSrcIdx !== null && dragSrcIdx !== targetIdx) {
        const draggedAcct = state.accounts.splice(dragSrcIdx, 1)[0];
        state.accounts.splice(targetIdx, 0, draggedAcct);
        saveState();
        renderAccounts();
      }
      return false;
    });
  });
}

function deleteAcct(name){
  const used = state.transactions.some(t=>t.account===name || t.transferTo===name);
  if(used){ toast('Failed: Account is currently used in transactions'); return; }
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
  const newName = prompt('Name for duplicated account:', a.name + ' Copy');
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
  
  const rate = CURRENCIES[state.currency || 'IDR'].rate;
  if(a) {
    const rawBal = accBal[a.name] || 0;
    const val = rawBal / rate;
    document.getElementById('acctBalance').value = val % 1 === 0 ? val : val.toFixed(2);
  } else {
    document.getElementById('acctBalance').value = 0;
  }
  
  document.getElementById('acctModalOverlay').classList.add('open');
  document.getElementById('acctName').focus();
}
function closeAcctModal(){ document.getElementById('acctModalOverlay').classList.remove('open'); }

function saveAcctForm(){
  const name = document.getElementById('acctName').value.trim();
  const type = document.getElementById('acctType').value;
  
  const rate = CURRENCIES[state.currency || 'IDR'].rate;
  const currentBalanceTarget = (Number(document.getElementById('acctBalance').value) || 0) * rate;
  
  if(!name){ toast('Account name is required'); return; }
  
  if(editingAcctName){
    const { accBal } = computeLedger();
    const idx = state.accounts.findIndex(a=>a.name===editingAcctName);
    
    if(editingAcctName!==name && state.accounts.some(a=>a.name===name)){
       toast('Account name already exists'); return; 
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
    if(state.accounts.some(a=>a.name===name)){ toast('Account name already exists'); return; }
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
      if(!state.currency) state.currency = 'IDR';
      document.getElementById('currencySelect').value = state.currency;
      saveState();
      renderCurrentTab();
      toast('Data successfully imported');
    }catch(e){
      toast('Failed to import: invalid file');
    }
  };
  reader.readAsText(file);
}
function resetData(){
  if(!confirm('Reset this data? Transactions and accounts will be deleted.')) return;
  state = JSON.parse(JSON.stringify(SEED));
  document.getElementById('currencySelect').value = state.currency;
  saveState();
  renderCurrentTab();
  toast('Data reset');
}

/* ============ AUTH UI ACTIONS ============ */
function openAuthModal() {
  document.getElementById('authModalOverlay').classList.add('open');
}
function closeAuthModal() {
  document.getElementById('authModalOverlay').classList.remove('open');
}

async function handleLoginEmail() {
  const email = document.getElementById('authEmail').value;
  const pass = document.getElementById('authPassword').value;
  if(!email || !pass) return toast('Please fill in Email & Password');
  
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    closeAuthModal();
  } catch(e) {
    console.error(e);
    toast('Login Failed: ' + e.message);
  }
}

async function handleRegisterEmail() {
  const email = document.getElementById('authEmail').value;
  const pass = document.getElementById('authPassword').value;
  if(!email || !pass) return toast('Please fill in Email & Password');

  try {
    await createUserWithEmailAndPassword(auth, email, pass);
    closeAuthModal();
  } catch(e) {
    console.error(e);
    toast('Signup Failed: ' + e.message);
  }
}

async function handleLoginGoogle() {
  try {
    await signInWithPopup(auth, googleProvider);
    closeAuthModal();
  } catch(e) {
    console.error(e);
    toast('Google Login Failed: ' + e.message);
  }
}

async function handleLogout() {
  try {
    await signOut(auth);
    toast('Logged out successfully');
    closeAuthModal();
  } catch(e) {
    console.error(e);
  }
}

/* ============ INIT ============ */
function init(){
  initTheme();
  renderNav();
  document.querySelectorAll('.view').forEach(v=> v.classList.toggle('active', v.id==='view-'+currentTab));
  
  // Set up Currency Selector
  const currSelect = document.getElementById('currencySelect');
  if(currSelect) {
    currSelect.value = state.currency || 'IDR';
    currSelect.addEventListener('change', (e) => {
      state.currency = e.target.value;
      saveState();
      renderCurrentTab();
      toast(`Currency changed to ${state.currency}`);
    });
  }

  renderCurrentTab();
  
  setTimeout(initEmojiPicker, 500); 

  // Theme Toggle
  document.getElementById('btnThemeToggle').addEventListener('click', toggleTheme);

  // Auth Toggles
  document.getElementById('btnAuthOpen').addEventListener('click', openAuthModal);
  document.getElementById('btnAuthClose').addEventListener('click', closeAuthModal);
  document.getElementById('authModalOverlay').addEventListener('click', e=>{ if(e.target.id==='authModalOverlay') closeAuthModal(); });
  
  document.getElementById('btnLoginEmail').addEventListener('click', handleLoginEmail);
  document.getElementById('btnRegisterEmail').addEventListener('click', handleRegisterEmail);
  document.getElementById('btnLoginGoogle').addEventListener('click', handleLoginGoogle);
  document.getElementById('btnLogout').addEventListener('click', handleLogout);

  // Emoji Popover Toggles
  document.getElementById('btnCatIcon').addEventListener('click', () => {
    document.getElementById('catEmojiPopover').classList.toggle('show');
  });
  document.getElementById('btnSubIcon').addEventListener('click', () => {
    document.getElementById('subEmojiPopover').classList.toggle('show');
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

  // Budgets
  document.getElementById('btnBudgetSave').addEventListener('click', saveBudgetForm);
  document.getElementById('btnBudgetCancel').addEventListener('click', closeBudgetModal);
  document.getElementById('btnBudgetClose').addEventListener('click', closeBudgetModal);
  document.getElementById('budgetModalOverlay').addEventListener('click', e=>{ if(e.target.id==='budgetModalOverlay') closeBudgetModal(); });

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
      closeTxnModal(); closeAcctModal(); closeCatModal(); closeSubModal(); closeBudgetModal(); closeAuthModal();
      document.querySelectorAll('.emoji-popover').forEach(p => p.classList.remove('show'));
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
