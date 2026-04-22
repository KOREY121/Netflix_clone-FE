// ═══════════════════════════════════════════
//  STREAMVAULT — Shared App Logic
// ═══════════════════════════════════════════

/* ── NAV INJECTION ── */
function renderNav(activePage = 'home') {
  const pages = {
    home:    'index.html',
    movies:  'pages/movies.html',
    series:  'pages/series.html',
    mylist:  'pages/mylist.html',
    player:  'pages/player.html',
  };

  const prefix = activePage === 'home' ? '' : '../';

  const profile = SV.profiles[SV.activeProfile];

  document.getElementById('sv-nav').innerHTML = `
    <a class="sv-logo" href="${prefix}index.html">Stream<span>V</span>ault</a>
    <nav class="sv-nav-links">
      <a href="${prefix}index.html"              ${activePage==='home'   ?'class="active"':''}>Home</a>
      <a href="${prefix}pages/movies.html"       ${activePage==='movies' ?'class="active"':''}>Movies</a>
      <a href="${prefix}pages/series.html"       ${activePage==='series' ?'class="active"':''}>Series</a>
      <a href="${prefix}pages/mylist.html"       ${activePage==='mylist' ?'class="active"':''}>My List</a>
    </nav>
    <div class="sv-nav-right">
      <button class="sv-search-btn" onclick="toggleSearch()" title="Search">🔍</button>
      <div class="sv-avatar" id="navAvatar" title="Profiles">${profile.avatar}</div>
    </div>
  `;
}

/* ── PROFILE BAR ── */
function renderProfileBar(prefix = '') {
  const items = SV.profiles.map((p, i) => {
    const colors = [
      'background:linear-gradient(135deg,#1a3a6b,#2563b0)',
      'background:linear-gradient(135deg,#0f2044,#1e3a5f)',
      'background:linear-gradient(135deg,#2563b0,#0a1628)',
      'background:linear-gradient(135deg,#1e3a5f,#1a3a6b)',
    ];
    return `
      <div class="sv-profile-item ${i === SV.activeProfile ? 'active' : ''}" onclick="switchProfile(${i})">
        <div class="sv-profile-avatar" style="${colors[i]}">${p.avatar}</div>
        <span class="sv-profile-name">${p.name}</span>
      </div>`;
  }).join('');

  document.getElementById('sv-profile-bar').innerHTML = `
    <span class="sv-profile-label">Profiles</span>
    ${items}
  `;
}

/* ── MODAL ── */
function renderModal() {
  if (document.getElementById('sv-modal-overlay')) return;
  const el = document.createElement('div');
  el.className = 'sv-modal-overlay';
  el.id = 'sv-modal-overlay';
  el.onclick = e => { if (e.target === el) closeModal(); };
  el.innerHTML = `
    <div class="sv-modal" id="sv-modal">
      <div class="sv-modal-hero" id="sv-modal-hero">
        <button class="sv-modal-close" onclick="closeModal()">✕</button>
        <div class="sv-modal-hero-content">
          <div class="sv-modal-title" id="sv-m-title">—</div>
          <div class="sv-modal-meta">
            <span class="gold" id="sv-m-rating">★ —</span>
            <span id="sv-m-year">—</span>
            <span id="sv-m-duration">—</span>
            <span id="sv-m-age" style="border:1px solid rgba(59,130,246,0.4);padding:1px 8px;border-radius:4px;font-size:0.7rem;color:var(--sap-200);">—</span>
          </div>
          <div class="sv-modal-actions">
            <button class="btn-primary" onclick="goToPlayer()">▶ &nbsp;Play</button>
            <button class="btn-secondary" id="sv-m-list-btn" onclick="toggleListFromModal()">+ &nbsp;My List</button>
            <button class="btn-icon">👍</button>
            <button class="btn-icon">🔔</button>
          </div>
        </div>
      </div>
      <div class="sv-modal-body">
        <div class="sv-modal-grid">
          <div class="sv-modal-item"><label>Genre</label><span id="sv-m-genre">—</span></div>
          <div class="sv-modal-item"><label>Audio</label><span>Dolby Atmos · 5.1 · Stereo</span></div>
          <div class="sv-modal-item"><label>Subtitles</label><span>EN · FR · ES · PT · AR</span></div>
          <div class="sv-modal-item"><label>Quality</label><span>4K Ultra HD · HDR10</span></div>
        </div>
        <div class="sv-modal-desc" id="sv-m-desc">—</div>
      </div>
    </div>
  `;
  document.body.appendChild(el);
}

let _modalContentId = null;

function openModal(id) {
  const item = SV.getById(id);
  if (!item) return;
  _modalContentId = id;

  renderModal();

  document.getElementById('sv-m-title').textContent    = item.title;
  document.getElementById('sv-m-rating').textContent   = `★ ${item.rating}`;
  document.getElementById('sv-m-year').textContent     = item.release_year;
  document.getElementById('sv-m-duration').textContent = item.duration;
  document.getElementById('sv-m-age').textContent      = item.age_rating;
  document.getElementById('sv-m-genre').textContent    = item.genre;
  document.getElementById('sv-m-desc').textContent     = item.desc;
  updateListBtn();

  // Vary the hero gradient
  const grads = [
    'linear-gradient(135deg,#1a3a6b,#0a1628,#2563b0)',
    'linear-gradient(135deg,#0f2044,#1e3a5f,#1a3a6b)',
    'linear-gradient(135deg,#2563b0,#030712,#0f2044)',
    'linear-gradient(135deg,#060d1f,#1a3a6b,#1e3a5f)',
  ];
  document.getElementById('sv-modal-hero').style.background = grads[id % grads.length];

  requestAnimationFrame(() => {
    document.getElementById('sv-modal-overlay').classList.add('open');
  });
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const el = document.getElementById('sv-modal-overlay');
  if (el) el.classList.remove('open');
  document.body.style.overflow = '';
}

function updateListBtn() {
  const btn = document.getElementById('sv-m-list-btn');
  if (!btn || !_modalContentId) return;
  btn.textContent = SV.isInList(_modalContentId) ? '✓ In My List' : '+ My List';
}

function toggleListFromModal() {
  if (!_modalContentId) return;
  SV.toggleList(_modalContentId);
  updateListBtn();
}

function goToPlayer() {
  if (!_modalContentId) return;
  const prefix = window.location.pathname.includes('/pages/') ? '' : 'pages/';
  window.location.href = `${prefix}player.html?id=${_modalContentId}`;
}

/* ── CARD BUILDERS ── */
function buildPosterCard(item) {
  return `
    <div class="sv-card" onclick="openModal(${item.content_id})">
      <div class="sv-card-thumb">
        <span style="opacity:0.22">${item.icon}</span>
        <div class="sv-card-overlay">
          <div class="sv-card-play">▶</div>
          <div class="sv-card-genre-tag">${item.genre}</div>
        </div>
      </div>
      <div class="sv-card-info">
        <div class="sv-card-title">${item.title}</div>
        <div class="sv-card-sub">${item.release_year} · ${item.duration}</div>
        <div class="sv-card-rating">★ ${item.rating}</div>
      </div>
    </div>`;
}

function buildWideCard(item) {
  return `
    <div class="sv-wide-card" onclick="openModal(${item.content_id})">
      <div class="sv-wide-card-bg"></div>
      <div class="sv-wide-card-content">
        <div class="sv-wide-badge">${item.genre}</div>
        <div class="sv-wide-title">${item.title}</div>
        <div class="sv-wide-sub">${item.release_year} · ${item.duration} · ★ ${item.rating}</div>
      </div>
    </div>`;
}

function buildTop10Card(item, num) {
  return `
    <div class="sv-top10-card" onclick="openModal(${item.content_id})">
      <div class="sv-top10-num">${num}</div>
      <div class="sv-top10-thumb" style="background:linear-gradient(160deg,${top10Colors[num % top10Colors.length]});">
        <span style="opacity:0.2;font-size:2rem;">${item.icon}</span>
      </div>
    </div>`;
}

const top10Colors = [
  '#2563b0,#030712','#1a3a6b,#060d1f','#0f2044,#1e3a5f',
  '#1e3a5f,#0a1628','#0a1628,#2563b0','#060d1f,#1a3a6b',
  '#1a3a6b,#0f2044','#2563b0,#0a1628','#0f2044,#060d1f','#1e3a5f,#2563b0'
];

function buildContinueCard(h) {
  const title = h.content?.title || '—';
  const epLabel = h.ep ? `S${h.ep.season_id} E${h.ep.episode_number} — ${h.ep.title}` : `Movie · ${100 - h.progress}% left`;
  return `
    <div class="sv-progress-card" onclick="openModal(${h.content_id})">
      <div class="sv-progress-thumb">
        <span style="opacity:0.2;">${h.content?.icon || '🎬'}</span>
        <div class="sv-progress-play-btn"><div class="sv-play-icon">▶</div></div>
      </div>
      <div class="sv-progress-bar-wrap">
        <div class="sv-progress-bar-fill" style="width:${h.progress}%"></div>
      </div>
      <div class="sv-progress-info">
        <div class="sv-progress-title">${title}</div>
        <div class="sv-progress-ep">${epLabel}</div>
      </div>
    </div>`;
}

function populateRow(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/* ── SEARCH ── */
function toggleSearch() {
  const s = document.getElementById('sv-search-section');
  if (!s) return;
  const hidden = s.style.display === 'none' || !s.style.display;
  s.style.display = hidden ? 'block' : 'none';
  if (hidden) s.querySelector('input')?.focus();
}

function filterCards(q) {
  document.querySelectorAll('.sv-card').forEach(c => {
    const t = c.querySelector('.sv-card-title')?.textContent.toLowerCase() || '';
    c.style.opacity = (!q || t.includes(q.toLowerCase())) ? '1' : '0.2';
    c.style.pointerEvents = (!q || t.includes(q.toLowerCase())) ? '' : 'none';
  });
}

/* ── GENRE FILTER ── */
function toggleGenre(el, filterFn) {
  document.querySelectorAll('.sv-genre-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const genre = el.dataset.genre;
  if (filterFn) filterFn(genre);
}

/* ── PROFILE ── */
function switchProfile(idx) {
  SV.activeProfile = idx;
  localStorage.setItem('sv_profile', idx);
  document.querySelectorAll('.sv-profile-item').forEach((p, i) => {
    p.classList.toggle('active', i === idx);
  });
  const nav = document.getElementById('navAvatar');
  if (nav) nav.textContent = SV.profiles[idx].avatar;
}

/* ── FOOTER ── */
function renderFooter(prefix = '') {
  const el = document.getElementById('sv-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="sv-footer-logo">StreamVault</div>
    <div class="sv-footer-links">
      <a href="#">Terms</a>
      <a href="#">Privacy</a>
      <a href="#">Help</a>
      <a href="${prefix}pages/mylist.html">My List</a>
    </div>
    <div class="sv-footer-copy">© 2025 StreamVault Inc.</div>
  `;
}

/* ── ESC KEY ── */
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
