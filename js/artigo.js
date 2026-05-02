// ============================================================
//  Lê o ?slug= da URL, acha o artigo no array (artigos.js)
//  e injeta o conteúdo no hero e no corpo da página.
// NAO MEXER!!!!!!!!
//  DEPENDÊNCIA: artigos.js deve ser carregado ANTES deste arquivo.
// ============================================================

(function () {

  // ── Lê o slug da URL (?slug=frontend-vs-backend) ─────────
  const params = new URLSearchParams(window.location.search);
  const slug   = params.get('slug');
  const artigo = artigos.find(a => a.slug === slug);

  const hero = document.getElementById('artigo-hero-inner');
  const body = document.getElementById('artigo-body');

  // ── Artigo não encontrado ─────────────────────────────────
  if (!artigo) {
    hero.innerHTML = '';
    body.innerHTML = `
      <div class="artigo-404">
        <h2>Artigo não encontrado</h2>
        <p>O artigo que você procura não existe ou foi removido.</p>
        <br>
        <a href="./blog.html">← Voltar ao blog</a>
      </div>
    `;
    return;
  }

  // ── Atualiza o título da aba ──────────────────────────────
  document.title = `${artigo.titulo} — Mirai Tech`;

  // ── Preenche o hero ───────────────────────────────────────
  hero.innerHTML = `
    <div class="artigo-breadcrumb">
      <a href="./blog.html">Blog</a>
      <span>›</span>
      <span>${artigo.categoria}</span>
    </div>
    <div class="artigo-tag">${artigo.categoria}</div>
    <h1>${artigo.titulo}</h1>
    <div class="artigo-meta">
      <span>${artigo.autor}</span>
      <span class="artigo-meta-sep">·</span>
      <span>${artigo.data}</span>
      <span class="artigo-meta-sep">·</span>
      <span>${artigo.leitura}</span>
    </div>
  `;

  // ── Preenche o corpo ──────────────────────────────────────
  body.innerHTML = `
    <a href="./blog.html" class="artigo-voltar">← Voltar ao blog</a>
    ${artigo.conteudo}
    <div class="artigo-cta">
      <h3>Pronto para colocar seu projeto no ar?</h3>
      <p>Na Mirai Tech desenvolvemos sites profissionais com Front-End impecável e Back-End robusto — do wireframe ao deploy.</p>
      <a href="./mirai.html#orcamento" class="btn-primary">Solicitar orçamento grátis</a>
    </div>
  `;

  // ── Scroll do header ──────────────────────────────────────
  const header = document.querySelector('.header-main');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

})();