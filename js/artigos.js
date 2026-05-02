// ============================================================
//  MIRAI TECH — Base de artigos
//  Para adicionar um novo artigo: copie um objeto do array,
//  mude o slug e preencha o conteúdo. Só isso.
// ============================================================

const artigos = [
  {
    slug: "frontend-vs-backend",
    categoria: "Front-End e Back-End",
    titulo: "Front-End vs Back-End: qual a diferença e por que seu site precisa dos dois?",
    data: "30 de abril de 2026",
    leitura: "8 min de leitura",
    autor: "Mirai Tech",
    // conteúdo em HTML — use as classes: artigo-body h2, h3, p, ul, artigo-callout, artigo-table-wrap
    conteudo: `
      <p>Se você está pensando em criar ou melhorar o seu site, provavelmente já ouviu os termos <strong>Front-End</strong> e <strong>Back-End</strong>. Mas o que eles significam na prática? E por que todo projeto digital sólido depende dos dois?</p>

      <h2>O que é Front-End?</h2>
      <p>Front-End é tudo que o usuário <strong>vê e interage</strong> no navegador: botões, menus, animações, cores, formulários. É a camada visual do seu site.</p>
      <ul>
        <li><strong>HTML</strong> — estrutura e semântica da página</li>
        <li><strong>CSS</strong> — estilos visuais e responsividade</li>
        <li><strong>JavaScript</strong> — interatividade no navegador</li>
        <li><strong>React / Vue</strong> — frameworks para interfaces complexas</li>
      </ul>
      <div class="artigo-callout">
        <p>💡 <strong>Analogia:</strong> o Front-End é a fachada e a decoração do restaurante — é o que encanta o cliente na primeira visita.</p>
      </div>

      <h2>O que é Back-End?</h2>
      <p>O Back-End roda nos servidores, invisível para o usuário, mas responsável por toda a <strong>lógica, segurança e dados</strong> da aplicação.</p>
      <ul>
        <li><strong>Node.js, PHP, Python</strong> — linguagens de servidor</li>
        <li><strong>Bancos de dados</strong> — MySQL, PostgreSQL, MongoDB</li>
        <li><strong>APIs REST</strong> — ponte entre Front e Back</li>
        <li><strong>Autenticação</strong> — proteção de dados e sessões</li>
      </ul>
      <div class="artigo-callout">
        <p>💡 <strong>Analogia:</strong> o Back-End é a cozinha — o cliente não vê, mas é lá que tudo acontece.</p>
      </div>

      <h2>Comparativo direto</h2>
      <div class="artigo-table-wrap">
        <table class="artigo-table">
          <thead><tr><th>Aspecto</th><th>Front-End</th><th>Back-End</th></tr></thead>
          <tbody>
            <tr><td>Onde roda</td><td>Navegador do usuário</td><td>Servidor remoto</td></tr>
            <tr><td>O usuário vê?</td><td>Sim</td><td>Não</td></tr>
            <tr><td>Foco</td><td>Experiência e visual</td><td>Lógica e segurança</td></tr>
            <tr><td>Tecnologias</td><td>HTML, CSS, JS, React</td><td>Node, PHP, banco de dados</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Por que seu projeto precisa dos dois?</h2>
      <p>Um site bonito sem Back-End é só um folheto estático. Um Back-End poderoso com Front-End ruim afasta usuários antes de conhecerem seu produto. Na Mirai Tech as duas camadas andam sempre juntas.</p>
    `
  },

  {
    slug: "desenvolvimento-web-2026",
    categoria: "Desenvolvimento Web",
    titulo: "Tendências de Desenvolvimento Web para 2026: o que você precisa saber",
    data: "25 de abril de 2026",
    leitura: "6 min de leitura",
    autor: "Mirai Tech",
    conteudo: `
      <p>O desenvolvimento web evolui rápido. Em 2026, algumas tendências estão redefinindo como sites e aplicações são construídos — e ignorá-las pode deixar seu negócio para trás.</p>

      <h2>1. Performance como prioridade zero</h2>
      <p>O Google ranqueia sites mais rápidos no topo das buscas. Core Web Vitals se tornaram critério eliminatório: se o seu site demora mais de 2.5s para carregar o conteúdo principal, você está perdendo clientes — e posição no Google.</p>
      <div class="artigo-callout">
        <p>💡 Sites 1 segundo mais rápidos convertem até <strong>27% a mais</strong>, segundo dados do Google.</p>
      </div>

      <h2>2. IA integrada às interfaces</h2>
      <p>Chatbots inteligentes, buscas semânticas e recomendações personalizadas deixaram de ser diferenciais e viraram expectativa do usuário. Integrar modelos de linguagem ao seu site ficou mais acessível do que nunca.</p>

      <h2>3. Design responsivo não basta mais</h2>
      <p>Mobile-first é o mínimo. Em 2026 o padrão é <strong>adaptive design</strong> — interfaces que se adaptam não só ao tamanho da tela, mas ao contexto de uso: velocidade de conexão, preferências do sistema operacional, modo escuro/claro.</p>

      <h2>4. Acessibilidade como requisito legal</h2>
      <p>A legislação brasileira (LBI e WCAG 2.2) exige acessibilidade digital. Sites de empresas que não atendem aos critérios estão sujeitos a multas e ações judiciais. Além disso, sites acessíveis ranqueiam melhor.</p>

      <ul>
        <li>Contraste mínimo de 4.5:1 para textos</li>
        <li>Navegação completa por teclado</li>
        <li>Alt text descritivo em todas as imagens</li>
        <li>Estrutura semântica de headings (h1 → h2 → h3)</li>
      </ul>

      <h2>5. Segurança by design</h2>
      <p>HTTPS, proteção contra XSS, CSRF e SQL Injection já são básico. Em 2026 o mercado exige também: autenticação multifator, políticas de CSP e auditorias periódicas de vulnerabilidades.</p>
    `
  },

  {
    slug: "ecommerce-conversao",
    categoria: "E-commerce",
    titulo: "5 erros que estão matando a conversão da sua loja virtual",
    data: "18 de abril de 2026",
    leitura: "7 min de leitura",
    autor: "Mirai Tech",
    conteudo: `
      <p>A taxa média de conversão de e-commerces brasileiros gira em torno de 1,5%. Isso significa que 98 de cada 100 visitantes saem sem comprar. A boa notícia: a maioria dos abandons tem causa identificável e corrigível.</p>

      <h2>Erro 1: Checkout longo demais</h2>
      <p>Cada campo extra no checkout é uma chance a mais de desistência. O ideal é 3 etapas no máximo: dados pessoais, endereço e pagamento. Tudo em uma única página (one-page checkout) converte ainda mais.</p>
      <div class="artigo-callout">
        <p>💡 Lojas que reduziram o checkout de 5 para 3 etapas viram aumento médio de <strong>35% na conversão</strong>.</p>
      </div>

      <h2>Erro 2: Frete surpresa no final</h2>
      <p>Mostrar o valor do frete só na última etapa é o caminho mais rápido para o abandono de carrinho. Exiba o simulador de frete logo na página do produto.</p>

      <h2>Erro 3: Imagens de baixa qualidade</h2>
      <p>No e-commerce, a imagem é o produto. Fotos com fundo branco limpo, múltiplos ângulos e zoom funcional aumentam a confiança do comprador e reduzem devoluções.</p>

      <h2>Erro 4: Nenhuma prova social</h2>
      <p>Avaliações, fotos de clientes e número de vendas reduzem a percepção de risco. Um produto com 47 avaliações 4.8★ vende muito mais que o mesmo produto sem nenhuma avaliação, mesmo sendo idênticos.</p>

      <h2>Erro 5: Site lento no celular</h2>
      <p>Mais de 70% das compras online no Brasil são iniciadas pelo celular. Se o seu site demora mais de 3 segundos para carregar numa conexão 4G, você está perdendo a maioria dos seus potenciais clientes.</p>

      <ul>
        <li>Comprima imagens (use WebP ao invés de JPEG/PNG)</li>
        <li>Ative cache do navegador</li>
        <li>Use CDN para servir assets estáticos</li>
        <li>Adie o carregamento de scripts não críticos</li>
      </ul>
    `
  },

  // ── ADICIONE NOVOS ARTIGOS AQUI ──────────────────────────
  // {
  //   slug: "meu-novo-artigo",
  //   categoria: "Marketing",
  //   titulo: "Título do artigo",
  //   data: "1 de maio de 2026",
  //   leitura: "5 min de leitura",
  //   autor: "Mirai Tech",
  //   conteudo: `<p>Conteúdo aqui...</p>`
  // },
];