/* Azolik frontend — talks to the Flask backend over /api/* */

const DEPT_STATES = {
  support: 'Online', sales: 'Working', marketing: 'Creating Campaign',
  finance: 'Processing', operations: 'Running Workflow', hr: 'Scheduling',
};

let CONTENT = null;

async function fetchJSON(url, opts) {
  const res = await fetch(url, opts);
  if (!res.ok) {
    let msg = 'Request failed';
    try { msg = (await res.json()).error || msg; } catch (e) {}
    throw new Error(msg);
  }
  return res.json();
}

/* ============ BOOTSTRAP ============ */
async function bootstrap() {
  try {
    CONTENT = await fetchJSON('/api/content');
  } catch (e) {
    console.error('Failed to load content', e);
    return;
  }
  renderStatusBar();
  renderBootPanel();
  renderDashSide();
  renderTimeline();
  renderDepartments();
  renderIndustries();
  renderIntegrations();
  renderOnboarding();
  renderTestimonials();
  renderFAQ();
  refreshStats();
  refreshActivity();
  setInterval(refreshStats, 8000);
  setInterval(refreshActivity, 6000);
}

/* ============ STATUS BAR ============ */
function renderStatusBar() {
  const track = document.getElementById('statusTrack');
  const items = [...CONTENT.departments, ...CONTENT.departments].map(d => {
    const state = DEPT_STATES[d.id] || 'Online';
    return `<span><span class="sdot" style="background:${d.hex}"></span>${d.name.toUpperCase()}: ${state}</span>`;
  }).join('');
  track.innerHTML = items + items;
}

/* ============ BOOT PANEL ============ */
function renderBootPanel() {
  const bootGrid = document.getElementById('bootGrid');
  bootGrid.innerHTML = CONTENT.departments.map(d => `
    <div class="boot-card" style="--dep-color:${d.hex}" data-live="${DEPT_STATES[d.id] || 'Online'}">
      <div class="dep-name"><span class="sdot" style="background:${d.hex}"></span>${d.name}</div>
      <div class="dep-status">Initializing…</div>
    </div>
  `).join('');
}
function wakeBootPanel() {
  const cards = document.querySelectorAll('#bootGrid .boot-card');
  cards.forEach((c, i) => {
    setTimeout(() => {
      c.classList.add('woke');
      setTimeout(() => { c.querySelector('.dep-status').textContent = c.dataset.live; }, 550);
    }, i * 260);
  });
}

/* ============ DASH SIDE + TOASTS ============ */
function renderDashSide() {
  const dashSide = document.getElementById('dashSide');
  dashSide.innerHTML = CONTENT.departments.map(d =>
    `<div class="dash-side-item"><span class="sdot" style="background:${d.hex}"></span>${d.name}</div>`
  ).join('');
}

let toastPool = [];
function seedToastPool() {
  toastPool = CONTENT.departments.map(d => ({ dept: d.name, hex: d.hex, text: d.tasks[Math.floor(Math.random() * d.tasks.length)] }));
}
function spawnToast() {
  const stream = document.getElementById('toastStream');
  if (!toastPool.length) seedToastPool();
  const t = toastPool[Math.floor(Math.random() * toastPool.length)];
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="sdot" style="background:${t.hex}"></span><span class="t-label"><span class="t-strong">${t.dept}</span> — ${t.text}</span>`;
  stream.appendChild(el);
  while (stream.children.length > 4) stream.removeChild(stream.firstChild);
}

/* ============ TIMELINE ============ */
function renderTimeline() {
  const wrap = document.getElementById('timelineWrap');
  wrap.innerHTML = CONTENT.timeline.map((s, i) => `
    <div class="tl-step">
      <div class="tl-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="tl-line"></div>
      <h4>${s.t}</h4>
      <p>${s.d}</p>
    </div>
  `).join('');
}

/* ============ DEPARTMENTS ============ */
const DEPT_ICONS = {
  support: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  sales: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  marketing: '<path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  finance: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  operations: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  hr: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
};

function renderDepartments() {
  const grid = document.getElementById('deptGrid');
  grid.innerHTML = CONTENT.departments.map(d => `
    <div class="dept-card" style="--dc:${d.hex}" data-id="${d.id}">
      <div class="dep-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${DEPT_ICONS[d.id] || ''}</svg></div>
      <h3>${d.name}</h3>
      <p class="dep-tagline">${d.tagline}</p>
      <div class="dep-expand"><div class="dep-expand-inner">
        <div class="dep-section-label">Tasks</div>
        <div class="dep-task-list">${d.tasks.map(t => `<div class="dep-task">${t}</div>`).join('')}</div>
        <div class="dep-section-label">Integrations</div>
        <div class="dep-chip-row">${d.integrations.map(x => `<span class="dep-chip">${x}</span>`).join('')}</div>
        <div class="dep-section-label">Example workflow</div>
        <div class="dep-workflow">${d.workflow.map((w, i) => `<div class="dep-wf-step"><span class="wf-i">${i + 1}</span>${w}</div>`).join('')}</div>
      </div></div>
    </div>
  `).join('');
  grid.addEventListener('click', e => {
    const card = e.target.closest('.dept-card');
    if (!card) return;
    const wasActive = card.classList.contains('active');
    grid.querySelectorAll('.dept-card').forEach(c => c.classList.remove('active'));
    if (!wasActive) card.classList.add('active');
  });
  grid.querySelector('.dept-card').classList.add('active');
}

/* ============ INDUSTRIES ============ */
function renderIndustries() {
  const tabs = document.getElementById('industryTabs');
  const preview = document.getElementById('industryPreview');
  tabs.innerHTML = CONTENT.industries.map((ind, i) =>
    `<button class="industry-tab ${i === 0 ? 'active' : ''}" data-i="${i}">${ind.name}</button>`
  ).join('');
  function show(i) {
    const ind = CONTENT.industries[i];
    preview.innerHTML = `<div class="ip-title">${ind.name} · Dashboard preview</div><p>${ind.text}</p>`;
  }
  show(0);
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('.industry-tab');
    if (!btn) return;
    tabs.querySelectorAll('.industry-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    show(+btn.dataset.i);
  });
}

/* ============ INTEGRATIONS ============ */
function renderIntegrations() {
  const cloud = document.getElementById('integCloud');
  cloud.innerHTML = CONTENT.integrations.map(x => `
    <div class="integ-badge"><span class="ib-dot" style="background:${x.hex}22;color:${x.hex};border:1px solid ${x.hex}44;">${x.i}</span>${x.name}</div>
  `).join('');
}

/* ============ ONBOARDING ============ */
function renderOnboarding() {
  const flow = document.getElementById('onboardFlow');
  flow.innerHTML = CONTENT.onboarding.map((s, i) => `
    <div class="ob-step" data-i="${i}">
      <div class="ob-line"></div>
      <div class="ob-dot">${i + 1}</div>
      <div class="ob-content"><h4>${s.t}</h4><p>${s.d}</p></div>
    </div>
  `).join('');
}

/* ============ TESTIMONIALS ============ */
function renderTestimonials() {
  const grid = document.getElementById('testiGrid');
  grid.innerHTML = CONTENT.testimonials.map(t => `
    <div class="testi-card">
      <p class="testi-quote">“${t.q}”</p>
      <div class="testi-who">
        <div class="testi-avatar" style="background:${t.hex};">${t.n.split(' ').map(x => x[0]).join('')}</div>
        <div><div class="testi-name">${t.n}</div><div class="testi-biz">${t.b}</div></div>
      </div>
    </div>
  `).join('');
}

/* ============ FAQ ============ */
function renderFAQ() {
  const list = document.getElementById('faqList');
  list.innerHTML = CONTENT.faqs.map((f, i) => `
    <div class="faq-item" data-i="${i}">
      <div class="faq-q">${f.q}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>
  `).join('');
  list.addEventListener('click', e => {
    const item = e.target.closest('.faq-item');
    if (!item) return;
    const wasOpen = item.classList.contains('open');
    list.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
}

/* ============ LIVE STATS ============ */
async function refreshStats() {
  try {
    const stats = await fetchJSON('/api/stats');
    document.querySelectorAll('[data-stat]').forEach(el => {
      const key = el.dataset.stat;
      if (key in stats) el.textContent = Number(stats[key]).toLocaleString();
    });
  } catch (e) { console.error('stats failed', e); }
}

/* ============ LIVE ACTIVITY FEED ============ */
function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso + 'Z').getTime();
  const mins = Math.max(1, Math.round(diffMs / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}
const DEPT_HEX = { Support: '#4fd1c5', Sales: '#a78bfa', Marketing: '#fb923c', Finance: '#34d399', Operations: '#60a5fa', HR: '#f472b6' };
async function refreshActivity() {
  const feed = document.getElementById('activityFeed');
  try {
    const rows = await fetchJSON('/api/activity?limit=8');
    if (!rows.length) {
      feed.innerHTML = `<div class="activity-empty">No activity yet — start free and this feed comes alive.</div>`;
      return;
    }
    feed.innerHTML = rows.map(r => `
      <div class="activity-row">
        <span class="sdot" style="background:${DEPT_HEX[r.department] || '#a78bfa'}"></span>
        <span class="a-biz">${r.business_name}</span>
        <span class="a-text">${r.text}</span>
        <span class="a-time">${timeAgo(r.created_at)}</span>
      </div>
    `).join('');
  } catch (e) { console.error('activity failed', e); }
}

/* ============ LIVE DEMO (calls backend) ============ */
function addBubble(type, text) {
  const body = document.getElementById('demoBody');
  const el = document.createElement('div');
  el.className = 'bubble ' + type;
  el.textContent = text;
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
  return el;
}
async function runDemoMessage(message) {
  addBubble('user', message);
  const typing = addBubble('sys', 'Support is reading the message…');
  try {
    const steps = await fetchJSON('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    typing.remove();
    steps.forEach((s, i) => {
      setTimeout(() => addBubble(s.type, s.text), i * 700);
    });
  } catch (e) {
    typing.remove();
    addBubble('sys', 'Could not reach the department right now.');
  }
}
let demoStarted = false;
function startDemoDefault() {
  if (demoStarted) return;
  demoStarted = true;
  setTimeout(() => runDemoMessage('Hi! Do you have chocolate cake available today?'), 400);
}

/* ============ SIGNUP MODAL ============ */
function wireSignupModal() {
  const overlay = document.getElementById('signupOverlay');
  const closeBtn = document.getElementById('signupClose');
  const form = document.getElementById('signupForm');
  const status = document.getElementById('signupStatus');

  document.querySelectorAll('[data-open-signup]').forEach(btn => {
    btn.addEventListener('click', () => {
      status.textContent = '';
      status.className = 'form-status';
      overlay.classList.add('open');
    });
  });
  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      business_name: document.getElementById('businessName').value,
      email: document.getElementById('email').value,
      industry: document.getElementById('industry').value,
    };
    status.textContent = 'Creating your departments…';
    status.className = 'form-status';
    try {
      const res = await fetchJSON('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      status.textContent = `Welcome, ${payload.business_name}. Your Support department is live.`;
      status.className = 'form-status ok';
      form.reset();
      document.querySelectorAll('[data-stat]').forEach(el => {
        const key = el.dataset.stat;
        if (key in res.stats) el.textContent = Number(res.stats[key]).toLocaleString();
      });
      refreshActivity();
      setTimeout(() => overlay.classList.remove('open'), 1800);
    } catch (err) {
      status.textContent = err.message || 'Something went wrong.';
      status.className = 'form-status err';
    }
  });
}

/* ============ CURSOR GLOW ============ */
function wireCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  window.addEventListener('pointermove', e => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
}

/* ============ PARTICLES ============ */
function initParticles() {
  const hero = document.querySelector('.hero');
  const colors = ['#4fd1c5', '#a78bfa', '#fb923c', '#34d399', '#60a5fa', '#f472b6'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 2 + Math.random() * 3;
    p.style.width = size + 'px'; p.style.height = size + 'px';
    p.style.left = (Math.random() * 100) + '%';
    p.style.top = (10 + Math.random() * 70) + '%';
    p.style.background = colors[i % colors.length];
    p.style.animationDuration = (6 + Math.random() * 8) + 's';
    p.style.animationDelay = (Math.random() * 6) + 's';
    hero.appendChild(p);
  }
}

/* ============ NAV SCROLL STATE ============ */
function wireNavScroll() {
  const headerEl = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    headerEl.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ============ SCROLL REVEAL ============ */
function wireScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        if (entry.target.id === 'dashReveal') {
          wakeBootPanel();
          setTimeout(() => { spawnToast(); setInterval(spawnToast, 2600); }, 1800);
        }
        if (entry.target.id === 'demoFrame') { startDemoDefault(); }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealEls.forEach(el => io.observe(el));
}

/* ============ DASH CLOCK ============ */
function wireClock() {
  const dashClock = document.getElementById('dashClock');
  function tick() {
    const d = new Date();
    dashClock.textContent = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  tick(); setInterval(tick, 1000);
}

/* ============ DEMO FORM ============ */
function wireDemoForm() {
  const form = document.getElementById('demoForm');
  const input = document.getElementById('demoInput');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    runDemoMessage(msg);
  });
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  wireCursorGlow();
  initParticles();
  wireNavScroll();
  wireClock();
  wireSignupModal();
  wireDemoForm();
  bootstrap().then(wireScrollReveal);
});