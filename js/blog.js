// ============================================================
//  MIRAI TECH — Blog: filtros + busca + navegação para artigos
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.blog-card');
  const catItems = document.querySelectorAll('#categoriasList li');
  const searchInput = document.getElementById('searchInput');
  const selectMobile = document.getElementById('selectCategoria');
  const blogGrid = document.getElementById('blogGrid');
  const blogEmpty = document.getElementById('blogEmpty');
  const btnLimpar = document.getElementById('btnLimparFiltro');

  let activeCategory = 'todos';
  let searchQuery = '';

  // ── Aplica filtros ───────────────────────────────────────
  function applyFilters() {
    let anyVisible = false;

    cards.forEach(card => {
      const cardCat = (card.dataset.category || '').toLowerCase().trim();
      const cardTitle = (card.querySelector('h2')?.textContent || '').toLowerCase();
      const cardExcerpt = (card.querySelector('.blog-excerpt')?.textContent || '').toLowerCase();
      const cardTag = (card.querySelector('.card-tag')?.textContent || '').toLowerCase();

      const matchCat = activeCategory === 'todos' || cardCat === activeCategory;
      const matchSearch = !searchQuery
        || cardTitle.includes(searchQuery)
        || cardExcerpt.includes(searchQuery)
        || cardTag.includes(searchQuery);

      const show = matchCat && matchSearch;
      card.style.display = show ? '' : 'none';
      if (show) anyVisible = true;
    });

    // Estado vazio
    if (blogEmpty) {
      blogEmpty.style.display = anyVisible ? 'none' : 'block';
    }
  }

  // ── Filtro por categoria (sidebar desktop) ───────────────
  catItems.forEach(li => {
    li.addEventListener('click', () => {
      catItems.forEach(i => i.classList.remove('active'));
      li.classList.add('active');
      activeCategory = (li.dataset.filter || '').toLowerCase().trim();

      // Sincroniza o select mobile
      if (selectMobile) selectMobile.value = activeCategory;

      applyFilters();
    });
  });

  // ── Filtro por categoria (select mobile) ─────────────────
  selectMobile?.addEventListener('change', () => {
    activeCategory = selectMobile.value.toLowerCase().trim();

    // Sincroniza os itens da sidebar
    catItems.forEach(li => {
      li.classList.toggle('active', li.dataset.filter === activeCategory);
    });

    applyFilters();
  });

  // ── Busca em tempo real ──────────────────────────────────
  searchInput?.addEventListener('input', () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  // ── Limpar filtro (botão do estado vazio) ────────────────
  btnLimpar?.addEventListener('click', () => {
    activeCategory = 'todos';
    searchQuery = '';

    if (searchInput) searchInput.value = '';
    if (selectMobile) selectMobile.value = 'todos';

    catItems.forEach(li => {
      li.classList.toggle('active', li.dataset.filter === 'todos');
    });

    applyFilters();
  });

  // ── Links dos cards → artigo.html?slug=... ───────────────
  cards.forEach(card => {
    const slug = card.dataset.slug;
    const link = card.querySelector('.blog-link');

    if (slug && link) {
      link.href = `./artigo.html?slug=${slug}`;
    }

    card.addEventListener('click', e => {
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
    }, { passive: true });
  }

});