/* =============================================
   app.js — Logique principale TechShare
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  applyInfo();
  buildStats();
  buildBooks();
  buildBookFilters();
  buildCategories();
  buildFilterBar();
  renderCards(RESOURCES);
  bindSearch();
  bindSort();
  bindModal();
  bindBookModal();
  bindNavToggle();
  bindViewToggle();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ── Info site ── */
function applyInfo() {
  document.title = SITE_INFO.name + ' — Ressources Informatiques';
}

/* ── Stats héro ── */
function buildStats() {
  const cats = [...new Set([
    ...RESOURCES.map(r => r.cat),
    ...BOOKS.map(b => b.cat),
  ])].length;
  const stats = [
    { num: BOOKS.length,     label: 'Livres' },
    { num: RESOURCES.length, label: 'Ressources' },
    { num: cats,             label: 'Catégories' },
  ];
  document.getElementById('heroStats').innerHTML = stats.map(s =>
    `<div class="hero-stat"><span class="stat-num">${s.num}</span><span class="stat-label">${s.label}</span></div>`
  ).join('');
}

/* ══════════════════════════════════════════════
   LIVRES
   ══════════════════════════════════════════════ */
let currentBookFilter = 'all';

function buildBooks(filter = 'all', query = '') {
  const q = query.toLowerCase().trim();
  const list = BOOKS.filter(b => {
    const matchF = filter === 'all' || b.cat === filter;
    const matchQ = !q || [b.title, b.author, b.cat, ...(b.tags||[])].join(' ').toLowerCase().includes(q);
    return matchF && matchQ;
  });

  /* Vedettes */
  const featured = list.filter(b => b.featured);
  const featSec  = document.getElementById('featuredSection');
  const featGrid = document.getElementById('booksFeatured');

  if (featured.length && filter === 'all' && !q) {
    featSec.style.display = 'block';
    featGrid.innerHTML = featured.map(bookFeaturedCard).join('');
  } else {
    featSec.style.display = 'none';
  }

  /* Grille complète */
  const grid = document.getElementById('booksGrid');
  const none = document.getElementById('noBooks');

  if (!list.length) {
    grid.innerHTML = '';
    none.style.display = 'block';
    return;
  }
  none.style.display = 'none';
  grid.innerHTML = list.map(bookCard).join('');
}

function bookFeaturedCard(b) {
  const lic = LICENSE_INFO[b.license] || { cls: 'lic-reserve' };
  const coverImg = b.cover
    ? `<img src="${b.cover}" alt="Couverture" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  return `
  <div class="book-featured-card" onclick="openBookModal('${b.id}')">
    <i class="ti ti-star-filled bfc-star"></i>
    <div class="bfc-cover">
      ${coverImg}
      <div class="bfc-cover-fallback" style="${b.cover ? 'display:none' : ''}"><i class="ti ti-book-2"></i></div>
    </div>
    <div class="bfc-info">
      <div class="bfc-cat">${b.cat}</div>
      <div class="bfc-title" title="${b.title}">${b.title}</div>
      <div class="bfc-author"><i class="ti ti-user" style="font-size:11px"></i> ${b.author}</div>
      <div class="bfc-meta">
        <span class="bfc-badge ${lic.cls}">${b.license}</span>
        ${b.pages ? `<span class="bfc-pages"><i class="ti ti-file-text"></i> ${b.pages} p.</span>` : ''}
        ${b.lang && b.lang !== 'Français' ? `<span class="bfc-pages">${b.lang}</span>` : ''}
      </div>
    </div>
  </div>`;
}

function bookCard(b) {
  const lic = LICENSE_INFO[b.license] || { cls: 'lic-reserve' };
  const isGrid = !document.getElementById('booksGrid').classList.contains('list-view');
  const coverImg = b.cover
    ? `<img src="${b.cover}" alt="Couverture" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  return `
  <div class="book-card" onclick="openBookModal('${b.id}')">
    <div class="book-cover">
      ${coverImg}
      <div class="book-cover-fallback" style="${b.cover ? 'display:none' : 'display:flex'}">
        <i class="ti ti-book-2"></i>
        <span>${b.cat}</span>
      </div>
      ${b.lang && b.lang !== 'Français' ? `<span class="book-cover-lang">${b.lang}</span>` : ''}
    </div>
    <div class="book-body">
      <div class="book-cat">${b.cat}</div>
      <div class="book-title">${b.title}</div>
      <div class="book-author">${b.author}</div>
    </div>
    <div class="book-footer">
      <span class="book-license ${lic.cls}">${b.license}</span>
      ${b.pages ? `<span class="book-pages"><i class="ti ti-file-text"></i> ${b.pages} p.</span>` : ''}
    </div>
  </div>`;
}

/* Filtres livres */
function buildBookFilters() {
  const cats = [...new Set(BOOKS.map(b => b.cat))].sort();
  document.getElementById('bookCountAll').textContent = BOOKS.length;
  const bar = document.getElementById('bookFilterBar');
  cats.forEach(c => {
    const count = BOOKS.filter(b => b.cat === c).length;
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.bfilter = c;
    btn.innerHTML = `${c} <span class="filter-count">${count}</span>`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-bfilter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBookFilter = c;
      buildBooks(c, document.getElementById('bookSearch').value);
    });
    bar.appendChild(btn);
  });
  document.querySelector('[data-bfilter="all"]').addEventListener('click', () => {
    document.querySelectorAll('[data-bfilter]').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-bfilter="all"]').classList.add('active');
    currentBookFilter = 'all';
    buildBooks('all', document.getElementById('bookSearch').value);
  });
  document.getElementById('bookSearch').addEventListener('input', e => {
    buildBooks(currentBookFilter, e.target.value);
  });
}

/* Vue grille / liste */
function bindViewToggle() {
  document.getElementById('viewGrid').addEventListener('click', () => {
    document.getElementById('booksGrid').classList.remove('list-view');
    document.getElementById('viewGrid').classList.add('active');
    document.getElementById('viewList').classList.remove('active');
    buildBooks(currentBookFilter, document.getElementById('bookSearch').value);
  });
  document.getElementById('viewList').addEventListener('click', () => {
    document.getElementById('booksGrid').classList.add('list-view');
    document.getElementById('viewList').classList.add('active');
    document.getElementById('viewGrid').classList.remove('active');
    buildBooks(currentBookFilter, document.getElementById('bookSearch').value);
  });
}

/* Modal livre */
function openBookModal(id) {
  const b = BOOKS.find(x => x.id === id);
  if (!b) return;
  const lic = LICENSE_INFO[b.license] || { cls: 'lic-reserve', terms: '' };

  const coverEl   = document.getElementById('bmCover');
  const fallbackEl= document.getElementById('bmCoverFallback');
  if (b.cover) {
    coverEl.src = b.cover;
    coverEl.style.display = 'block';
    fallbackEl.style.display = 'none';
  } else {
    coverEl.style.display = 'none';
    fallbackEl.style.display = 'flex';
  }

  document.getElementById('bmLang').textContent    = b.lang || 'Français';
  document.getElementById('bmTitle').textContent   = b.title;
  document.getElementById('bmAuthor').innerHTML    = `<i class="ti ti-user"></i> ${b.author}`;
  document.getElementById('bmDesc').textContent    = b.desc;
  document.getElementById('bmLicense').textContent = b.license;
  document.getElementById('bmCat').textContent     = b.cat;
  document.getElementById('bmPages').textContent   = b.pages ? b.pages + ' pages' : '—';
  document.getElementById('bmDate').textContent    = new Date(b.date).toLocaleDateString('fr-FR', { year:'numeric', month:'long', day:'numeric' });
  document.getElementById('bmTerms').innerHTML     = `<i class="ti ti-info-circle"></i> ${b.terms || lic.terms}`;

  /* Boutons d'accès */
  let btns = '';
  if (b.link_pdf)
    btns += `<a href="${b.link_pdf}" class="btn btn-primary" download><i class="ti ti-download"></i> Télécharger PDF</a>`;
  if (b.link_ext)
    btns += `<a href="${b.link_ext}" class="btn ${b.link_pdf ? 'btn-outline' : 'btn-primary'}" target="_blank" rel="noopener"><i class="ti ti-external-link"></i> Accéder en ligne</a>`;
  if (!b.link_pdf && !b.link_ext)
    btns = `<button class="btn btn-outline" disabled><i class="ti ti-clock"></i> Bientôt disponible</button>`;

  document.getElementById('bmActions').innerHTML = btns;
  document.getElementById('bookModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function bindBookModal() {
  document.getElementById('bookModalClose').addEventListener('click', () => {
    document.getElementById('bookModal').classList.remove('open');
    document.body.style.overflow = '';
  });
  document.getElementById('bookModal').addEventListener('click', e => {
    if (e.target === document.getElementById('bookModal')) {
      document.getElementById('bookModal').classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ══════════════════════════════════════════════
   CATÉGORIES (livres + ressources)
   ══════════════════════════════════════════════ */
function buildCategories() {
  const cats = {};
  [...RESOURCES, ...BOOKS].forEach(r => { cats[r.cat] = (cats[r.cat] || 0) + 1; });
  document.getElementById('catGrid').innerHTML = Object.entries(cats)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => {
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
  /* Scroll vers livres si la catégorie y est présente */
  const inBooks = BOOKS.some(b => b.cat === name);
  const target  = inBooks ? '#livres' : '#ressources';
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    if (inBooks) {
      document.querySelectorAll('[data-bfilter]').forEach(b => b.classList.remove('active'));
      const btn = document.querySelector(`[data-bfilter="${name}"]`);
      if (btn) { btn.classList.add('active'); currentBookFilter = name; }
      buildBooks(name, '');
    } else {
      setActiveFilter(name); applyFilters();
    }
  }, 400);
}

/* ══════════════════════════════════════════════
   AUTRES RESSOURCES
   ══════════════════════════════════════════════ */
let currentFilter = 'all';

function buildFilterBar() {
  const types = [...new Set(RESOURCES.map(r => r.type))];
  document.getElementById('countAll').textContent = RESOURCES.length;
  const bar = document.getElementById('filterBar');
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
  document.querySelectorAll('.filter-btn[data-filter]').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === val);
  });
}

function bindSearch() {
  [document.getElementById('mainSearch'), document.getElementById('navSearch')].forEach(input => {
    input?.addEventListener('input', e => {
      document.getElementById('mainSearch').value = e.target.value;
      document.getElementById('navSearch').value  = e.target.value;
      applyFilters();
    });
  });
}

function bindSort() {
  document.getElementById('sortSelect').addEventListener('change', applyFilters);
}

function applyFilters() {
  const q    = document.getElementById('mainSearch').value.toLowerCase().trim();
  const sort = document.getElementById('sortSelect').value;
  let list = RESOURCES.filter(r => {
    const matchF = currentFilter === 'all' || r.type === currentFilter || r.cat === currentFilter;
    const matchQ = !q || [r.title, r.desc, r.cat, r.type, ...(r.tags||[])].join(' ').toLowerCase().includes(q);
    return matchF && matchQ;
  });
  if (sort === 'date')  list.sort((a,b) => new Date(b.date) - new Date(a.date));
  if (sort === 'title') list.sort((a,b) => a.title.localeCompare(b.title, 'fr'));
  if (sort === 'type')  list.sort((a,b) => a.type.localeCompare(b.type, 'fr'));
  renderCards(list);
}

function renderCards(list) {
  const grid = document.getElementById('resourcesGrid');
  const none = document.getElementById('noResults');
  if (!list.length) { grid.innerHTML = ''; none.style.display = 'block'; return; }
  none.style.display = 'none';
  grid.innerHTML = list.map(r => {
    const lic    = LICENSE_INFO[r.license] || { cls: 'lic-reserve' };
    const typeCls= 'type-' + r.type.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-');
    const dateStr= new Date(r.date).toLocaleDateString('fr-FR', { year:'numeric', month:'short', day:'numeric' });
    return `
    <div class="resource-card" onclick="openModal(${r.id})">
      <div class="card-header">
        <span class="card-type-badge ${typeCls}"><i class="ti ${typeIcon(r.type)}"></i> ${r.type}</span>
        <span class="card-license-tag ${lic.cls}"><i class="ti ti-creative-commons"></i> ${r.license}</span>
      </div>
      <div class="card-title">${r.title}</div>
      <div class="card-desc">${r.desc}</div>
      <div class="card-footer">
        <span class="card-date"><i class="ti ti-calendar"></i> ${dateStr}</span>
        <span class="card-link-icon"><i class="ti ti-arrow-right"></i></span>
      </div>
    </div>`;
  }).join('');
}

function typeIcon(type) {
  const m = { 'Cours':'ti-book', 'Documentation':'ti-file-text', 'Outil':'ti-tool', 'Article':'ti-article', 'Vidéo':'ti-video', 'Livre':'ti-books', 'Autre':'ti-folder' };
  return m[type] || 'ti-file';
}

/* ── Modal ressource ── */
let currentLink = '#';

function openModal(id) {
  const r = RESOURCES.find(x => x.id === id); if (!r) return;
  const lic = LICENSE_INFO[r.license] || { cls:'lic-reserve', terms:'' };
  const typeCls = 'type-' + r.type.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-');
  document.getElementById('modalType').className   = `modal-type-badge ${typeCls}`;
  document.getElementById('modalType').innerHTML   = `<i class="ti ${typeIcon(r.type)}"></i> ${r.type}`;
  document.getElementById('modalTitle').textContent= r.title;
  document.getElementById('modalDesc').textContent = r.desc;
  document.getElementById('modalLicense').textContent = r.license;
  document.getElementById('modalDate').textContent = new Date(r.date).toLocaleDateString('fr-FR',{year:'numeric',month:'long',day:'numeric'});
  document.getElementById('modalCat').textContent  = r.cat;
  document.getElementById('modalTerms').innerHTML  = `<i class="ti ti-info-circle"></i> ${r.terms || lic.terms}`;
  currentLink = r.link;
  const btn = document.getElementById('modalBtn');
  btn.href = r.link;
  btn.innerHTML = r.link?.startsWith('http')
    ? '<i class="ti ti-external-link"></i> Accéder à la ressource'
    : '<i class="ti ti-download"></i> Télécharger';
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function bindModal() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', e => { if (e.target === document.getElementById('modal')) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); document.getElementById('bookModal').classList.remove('open'); document.body.style.overflow=''; } });
}

function closeModal() { document.getElementById('modal').classList.remove('open'); document.body.style.overflow = ''; }

function copyLink() {
  const full = currentLink?.startsWith('http') ? currentLink : window.location.origin + '/' + currentLink;
  navigator.clipboard.writeText(full).then(() => showToast('Lien copié !'));
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
function initTheme() {
  const saved = localStorage.getItem('techshare-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('themeToggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('techshare-theme', next);
    showToast(next === 'light' ? '☀️ Mode clair activé' : '🌙 Mode sombre activé');
  });
}