const cfg = window.STORE_CONFIG || {};
const products = window.PRODUCTS || [];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const waLink = (text = '') => {
  const phone = String(cfg.whatsapp || '').replace(/\D/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

function setConfig() {
  $('#storeName').textContent = cfg.name || 'InstantStore';
  $('#footerName').textContent = cfg.name || 'InstantStore';
  $('#heroTitle').textContent = cfg.heroTitle || 'Website Store Manual';
  $('#heroDesc').textContent = cfg.heroDesc || '';
  $('#contactDesc').textContent = cfg.contactDesc || '';
  $('#waHero').href = waLink('Halo admin, saya ingin bertanya.');
  $('#waContact').href = waLink('Halo admin, saya butuh bantuan.');
  $('#totalProduk').textContent = products.length;
  $('#year').textContent = new Date().getFullYear();
}

function showMiniLoader() {
  const loader = $('#pageLoader');
  loader.classList.remove('hide');
  setTimeout(() => loader.classList.add('hide'), 450);
}

function openTab(tabName) {
  showMiniLoader();
  setTimeout(() => {
    $$('.tab-page').forEach(page => page.classList.remove('active'));
    $$('.nav-link').forEach(link => link.classList.remove('active'));
    const page = document.getElementById(tabName);
    if (page) page.classList.add('active');
    $$(`[data-tab="${tabName}"]`).forEach(link => link.classList.add('active'));
    location.hash = tabName;
    $('#navLinks').classList.remove('open');
  }, 180);
}

function productCard(item) {
  const message = `${cfg.messagePrefix || 'Halo admin, saya mau order'} ${item.name} - ${item.price}`;
  return `
    <article class="product-card">
      <div class="product-top">
        <span>${item.category || 'Produk'}</span>
        <small>${item.badge || 'Ready'}</small>
      </div>
      <h3>${item.name}</h3>
      <p>${item.desc || ''}</p>
      <div class="product-bottom">
        <b>${item.price}</b>
        <a href="${waLink(message)}" target="_blank" rel="noopener">Order</a>
      </div>
    </article>
  `;
}

function renderProducts(keyword = '') {
  const key = keyword.toLowerCase().trim();
  const filtered = products.filter(p => `${p.name} ${p.category} ${p.price}`.toLowerCase().includes(key));
  $('#productGrid').innerHTML = filtered.length
    ? filtered.map(productCard).join('')
    : '<p class="empty">Produk tidak ditemukan.</p>';
}

function bindEvents() {
  $$('[data-tab]').forEach(el => el.addEventListener('click', () => openTab(el.dataset.tab)));
  $('#menuToggle').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
  $('#searchInput').addEventListener('input', (e) => renderProducts(e.target.value));
}

window.addEventListener('load', () => {
  setConfig();
  renderProducts();
  bindEvents();
  const initial = location.hash.replace('#', '') || 'home';
  if (document.getElementById(initial)) openTab(initial);
  setTimeout(() => $('#pageLoader').classList.add('hide'), 550);
});
