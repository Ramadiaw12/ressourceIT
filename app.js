/* =============================================
   app.js — Logique principale (ne pas modifier)
   ============================================= */

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  applyInfo();
  buildStats();
  buildCategories();
  buildFilterBar();
  renderCards(RESOURCES);
  bindSearch();
  bindSort();
  bindModal();
  bindNavToggle();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ── Appliquer les infos du propriétaire ── */
function applyInfo() {
  document.title = SITE_INFO.name + ' — Ressources Informatiques';
  document.querySelector('.logo').childNodes[1].textContent = ' ' + SITE_INFO.name;
  document.querySelector('.footer-logo').innerHTML = `<i class="ti ti-code"></i> ${SITE_INFO.name}`;
}

/* ── Stats héro ── */
function buildStats() {
  const cats = [...new Set(RESOURCES.map(r => r.cat))].length;
  const types = [...new Set(RESOURCES.map(r => r.type))].length;
  const stats = [
    { num: RESOURCES.length, label: 'Ressources' },
    { num: cats, label: 'Catégories' },
    { num: types, label: 'Types de contenu' },
  ];
  document.getElementById('heroStats').innerHTML = stats.map(s =>
    `<div class="hero-stat"><span class="stat-num">${s.num}</span><span class="stat-label">${s.label}</span></div>`
  ).join('');
}

/* ── Catégories ── */
function buildCategories() {
  const cats = {};
  RESOURCES.forEach(r => { cats[r.cat] = (cats[r.cat] || 0) + 1; });
  const grid = document.getElementById('catGrid');
  grid.innerHTML = Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([name, count]) => {
    const icon = CATEGORY_ICONS[name] || 'ti-folder';
    return `<div class="cat-card" onclick="filterByCategory('${name}', this)">
      <span class="cat-icon"><i class="ti ${icon}"></i></span>
      <div class="cat-name">${name}</div>
      <div class="cat-count">${count} ressource${count > 1 ? 's' : ''}</div>
    </div>`;
  }).join('');
}

function filterByCategory(name, el) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active-cat'));
  el.classList.add('active-cat');
  document.getElementById('ressources').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    setActiveFilter(name);
    applyFilters();
  }, 400);
}

/* ── Filter bar ── */
let currentFilter = 'all';

function buildFilterBar() {
  const types = [...new Set(RESOURCES.map(r => r.type))];
  const bar = document.getElementById('filterBar');
  document.getElementById('countAll').textContent = RESOURCES.length;
  types.forEach(t => {
    const count = RESOURCES.filter(r => r.type === t).length;
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = t;
    btn.innerHTML = `${t} <span class="filter-count">${count}</span>`;
    btn.addEventListener('click', () => { setActiveFilter(t); applyFilters(); });
    bar.appendChild(btn);
  });
  document.querySelector('[data-filter="all"]').addEventListener('click', () => {
    setActiveFilter('all');
    document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active-cat'));
    applyFilters();
  });
}

function setActiveFilter(val) {
  currentFilter = val;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === val);
  });
}

/* ── Search ── */
function bindSearch() {
  [document.getElementById('mainSearch'), document.getElementById('navSearch')].forEach(input => {
    input.addEventListener('input', e => {
      document.getElementById('mainSearch').value = e.target.value;
      document.getElementById('navSearch').value = e.target.value;
      applyFilters();
    });
  });
}

/* ── Sort ── */
function bindSort() {
  document.getElementById('sortSelect').addEventListener('change', applyFilters);
}

/* ── Apply filters + search + sort ── */
function applyFilters() {
  const query = document.getElementById('mainSearch').value.toLowerCase().trim();
  const sort  = document.getElementById('sortSelect').value;

  let results = RESOURCES.filter(r => {
    const matchFilter = currentFilter === 'all' || r.type === currentFilter || r.cat === currentFilter;
    const searchTarget = [r.title, r.desc, r.cat, r.type, ...(r.tags || [])].join(' ').toLowerCase();
    const matchSearch = !query || searchTarget.includes(query);
    return matchFilter && matchSearch;
  });

  if (sort === 'date')  results.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sort === 'title') results.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
  if (sort === 'type')  results.sort((a, b) => a.type.localeCompare(b.type, 'fr'));

  renderCards(results);
}

/* ── Render cards ── */
function renderCards(list) {
  const grid = document.getElementById('resourcesGrid');
  const none = document.getElementById('noResults');

  if (!list.length) {
    grid.innerHTML = '';
    none.style.display = 'block';
    return;
  }
  none.style.display = 'none';

  grid.innerHTML = list.map(r => {
    const licInfo = LICENSE_INFO[r.license] || { cls: 'lic-reserve', terms: '' };
    const typeCls = 'type-' + r.type.toLowerCase().replace(/[éèêë]/g, 'e').replace(/\s+/g, '-');
    const dateStr = new Date(r.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
    return `
    <div class="resource-card" onclick="openModal(${r.id})">
      <div class="card-header">
        <span class="card-type-badge ${typeCls}"><i class="ti ${typeIcon(r.type)}"></i> ${r.type}</span>
        <span class="card-license-tag ${licInfo.cls}"><i class="ti ti-creative-commons"></i> ${r.license}</span>
      </div>
      <div class="card-title">${r.title}</div>
      <div class="card-desc">${r.desc}</div>
      <div class="card-footer">
        <span class="card-date"><i class="ti ti-calendar"></i> ${dateStr}</span>
        <span class="card-link-icon" title="Accéder"><i class="ti ti-arrow-right"></i></span>
      </div>
    </div>`;
  }).join('');
}

function typeIcon(type) {
  const m = { 'Cours': 'ti-book', 'Documentation': 'ti-file-text', 'Outil': 'ti-tool', 'Article': 'ti-article', 'Vidéo': 'ti-video', 'Livre': 'ti-books', 'Autre': 'ti-folder' };
  return m[type] || 'ti-file';
}

/* ── Modal ── */
let currentLink = '#';

function openModal(id) {
  const r = RESOURCES.find(x => x.id === id);
  if (!r) return;
  const licInfo = LICENSE_INFO[r.license] || { cls: 'lic-reserve', terms: 'Consultez les conditions associées à cette ressource.' };
  const typeCls = 'type-' + r.type.toLowerCase().replace(/[éèêë]/g, 'e').replace(/\s+/g, '-');
  const dateStr = new Date(r.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

  document.getElementById('modalType').className  = `modal-type-badge ${typeCls}`;
  document.getElementById('modalType').innerHTML  = `<i class="ti ${typeIcon(r.type)}"></i> ${r.type}`;
  document.getElementById('modalTitle').textContent   = r.title;
  document.getElementById('modalDesc').textContent    = r.desc;
  document.getElementById('modalLicense').textContent = r.license;
  document.getElementById('modalDate').textContent    = dateStr;
  document.getElementById('modalCat').textContent     = r.cat;
  document.getElementById('modalTerms').innerHTML     = `<i class="ti ti-info-circle"></i> ${r.terms || licInfo.terms}`;

  currentLink = r.link;
  const btn = document.getElementById('modalBtn');
  btn.href = r.link;
  btn.innerHTML = r.link.startsWith('http')
    ? '<i class="ti ti-external-link"></i> Accéder à la ressource'
    : '<i class="ti ti-download"></i> Télécharger';

  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function bindModal() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Copy link ── */
function copyLink() {
  const full = currentLink.startsWith('http') ? currentLink : window.location.origin + '/' + currentLink;
  navigator.clipboard.writeText(full).then(() => showToast('Lien copié dans le presse-papier !'));
}

/* ── Nav toggle ── */
function bindNavToggle() {
  document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });
}

/* ── Toast ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ══════════════════════════════════════════════
   THÈME CLAIR / SOMBRE
   ══════════════════════════════════════════════ */
(function initTheme() {
  const saved = localStorage.getItem('techshare-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  document.getElementById('themeToggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('techshare-theme', next);
    showToast(next === 'light' ? '☀️ Mode clair activé' : '🌙 Mode sombre activé');
  });
})();