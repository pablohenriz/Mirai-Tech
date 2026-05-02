// ============================================================
//  MIRAI TECH — Blog: filtros + busca + navegação para artigos
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const cards       = document.querySelectorAll('.blog-card');
  const catItems    = document.querySelectorAll('.categories ul li');
  const searchInput = document.querySelector('.search-box input');
  const grid        = document.querySelector('.blog-grid');

  let activeCategory = 'todos';
  let searchQuery    = '';

  // ── Filtros ──────────────────────────────────────────────
  function applyFilters() {
    let anyVisible = false;

    cards.forEach(card => {
      const cardCat   = (card.dataset.category || '').toLowerCase();
      const cardTitle = (card.querySelector('h2')?.textContent || '').toLowerCase();
      const cardTag   = (card.querySelector('.tag-categoria')?.textContent || '').toLowerCase();

      const matchCat    = activeCategory === 'todos' || cardCat === activeCategory;
      const matchSearch = !searchQuery || cardTitle.includes(searchQuery) || cardTag.includes(searchQuery);

      const show = matchCat && matchSearch;
      card.style.display = show ? '' : 'none';
      if (show) anyVisible = true;
    });

    let empty = grid.querySelector('.blog-empty');
    if (!anyVisible) {
      if (!empty) {
        empty = document.createElement('p');
        empty.className = 'blog-empty';
        empty.textContent = 'Nenhum artigo encontrado para essa busca.';
        empty.style.cssText = 'grid-column:1/-1;text-align:center;color:#727272;padding:60px 0;font-size:15px;';
        grid.appendChild(empty);
      }
    } else {
      empty?.remove();
    }
  }

  // ── Categorias ───────────────────────────────────────────
  catItems.forEach(li => {
    li.addEventListener('click', () => {
      catItems.forEach(i => i.classList.remove('active'));
      li.classList.add('active');
      activeCategory = (li.dataset.filter || li.textContent.trim()).toLowerCase();
      applyFilters();
    });
  });

  // ── Busca ────────────────────────────────────────────────
  searchInput?.addEventListener('input', () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  // ── Links dos cards → artigo.html?slug=... ───────────────
  cards.forEach(card => {
    const slug = card.dataset.slug;
    const link = card.querySelector('.blog-link');

    if (slug && link) {
      link.href = `./artigo.html?slug=${slug}`;
    }

    card.addEventListener('click', (e) => {
      if (slug && !e.target.closest('.blog-link')) {
        window.location.href = `./artigo.html?slug=${slug}`;
      }
    });
  });

  // ── Scroll do header ─────────────────────────────────────
  const header = document.querySelector('.header-main');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

});