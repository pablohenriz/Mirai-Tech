// ============================================================
//  MIRAI TECH — Base de artigos
//  Para adicionar um novo artigo: copie um objeto do array,
//  mude o slug e preencha o conteúdo. Só isso.
// ============================================================

const artigos = [
  {
    slug: "wireframe-eficiente",
    categoria: "Wireframe",
    titulo: "Como criar wireframes eficientes para acelerar o desenvolvimento do seu site",
    data: "1 de maio de 2026",
    leitura: "5 min de leitura",
    autor: "Mirai Tech",
    conteudo: `
      <p>Antes de escrever uma linha de código ou escolher uma cor, todo projeto de site precisa de uma planta baixa. É isso que o <strong>wireframe</strong> representa: o esqueleto visual da sua aplicação, sem distrações de estilo.</p>

      <h2>O que é um wireframe?</h2>
      <p>Um wireframe é um esboço estrutural que define <strong>onde cada elemento vai estar</strong> na página: menus, botões, blocos de texto, imagens e formulários. Ele ignora cores, fontes e efeitos — o foco é só na hierarquia e no fluxo.</p>

      <div class="artigo-callout">
        <p>💡 Times que wireframeiam antes de codificar reduzem o número de retrabalhos em até <strong>40%</strong>, segundo pesquisas de UX.</p>
      </div>

      <h2>Wireframe de baixa fidelidade</h2>
      <p>São esboços rápidos, feitos à mão ou com ferramentas simples. O objetivo é validar a ideia com o mínimo de esforço possível.</p>
      <ul>
        <li><strong>Quando usar:</strong> fase inicial, alinhamento com o cliente</li>
        <li><strong>Ferramentas:</strong> papel e caneta, Balsamiq, Whimsical</li>
        <li><strong>Tempo médio:</strong> 30 minutos a 2 horas</li>
        <li><strong>Vantagem:</strong> qualquer alteração custa quase zero</li>
      </ul>

      <h2>Wireframe de alta fidelidade</h2>
      <p>Já se aproxima do produto final. Usa proporções reais, espaçamentos precisos e muitas vezes inclui textos reais no lugar de Lorem Ipsum.</p>
      <ul>
        <li><strong>Quando usar:</strong> antes de iniciar o desenvolvimento</li>
        <li><strong>Ferramentas:</strong> Figma, Adobe XD, Sketch</li>
        <li><strong>Tempo médio:</strong> 1 a 3 dias por tela</li>
        <li><strong>Vantagem:</strong> serve como guia preciso para o desenvolvedor</li>
      </ul>

      <h2>Quando usar cada um?</h2>
      <div class="artigo-table-wrap">
        <table class="artigo-table">
          <thead><tr><th>Momento</th><th>Tipo recomendado</th><th>Motivo</th></tr></thead>
          <tbody>
            <tr><td>Primeira reunião com cliente</td><td>Baixa fidelidade</td><td>Validar conceito rapidamente</td></tr>
            <tr><td>Aprovação da estrutura</td><td>Baixa fidelidade</td><td>Evitar retrabalho no design</td></tr>
            <tr><td>Handoff para o dev</td><td>Alta fidelidade</td><td>Guia preciso de implementação</td></tr>
            <tr><td>Testes de usabilidade</td><td>Alta fidelidade</td><td>Simular a experiência real</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Fluxo ideal de um projeto Mirai Tech</h2>
      <p>No nosso processo, wireframes de baixa fidelidade são criados na primeira semana, apresentados e aprovados pelo cliente. Só depois evoluímos para alta fidelidade — economizando tempo e garantindo que o resultado final reflita exatamente o que foi acordado.</p>
    `
  },

  {
    slug: "frontend-vs-backend",
    categoria: "Front-End e Back-End",
    titulo: "Front-End vs Back-End: qual a diferença e por que seu site precisa dos dois?",
    data: "30 de abril de 2026",
    leitura: "8 min de leitura",
    autor: "Mirai Tech",
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
    slug: "erros-site-profissional",
    categoria: "Desenvolvimento Web",
    titulo: "5 erros comuns ao criar um site profissional e como evitá-los",
    data: "28 de abril de 2026",
    leitura: "6 min de leitura",
    autor: "Mirai Tech",
    conteudo: `
      <p>Criar um site profissional parece simples — até você perceber que ele não gera resultados. A maioria dos sites que falham cometem os mesmos erros. Conheça os 5 mais comuns e como corrigi-los.</p>

      <h2>Erro 1: Não ter um objetivo claro</h2>
      <p>Cada página do seu site precisa ter <strong>uma única ação principal</strong> que você quer que o visitante tome: agendar uma consulta, solicitar um orçamento, baixar um material. Sites que tentam fazer tudo ao mesmo tempo não conseguem fazer nada direito.</p>
      <div class="artigo-callout">
        <p>💡 Defina antes de começar: qual é a <strong>conversão principal</strong> do seu site?</p>
      </div>

      <h2>Erro 2: Ignorar a velocidade de carregamento</h2>
      <p>53% dos visitantes abandonam um site que demora mais de 3 segundos para carregar no celular. Imagens pesadas, scripts desnecessários e hospedagem barata são os principais vilões.</p>
      <ul>
        <li>Use imagens no formato WebP (até 80% mais leves que JPEG)</li>
        <li>Escolha uma hospedagem com servidor no Brasil</li>
        <li>Ative compressão Gzip no servidor</li>
        <li>Adie o carregamento de scripts não críticos</li>
      </ul>

      <h2>Erro 3: Design que não reflete a marca</h2>
      <p>Um site genérico feito com template barato comunica que sua empresa também é genérica. Cores, tipografia e tom de voz precisam ser consistentes com sua identidade — do cartão de visita ao Instagram.</p>

      <h2>Erro 4: Falta de prova social</h2>
      <p>Depoimentos, cases, logos de clientes e certificações reduzem a desconfiança do visitante. Um site sem nenhuma prova social obriga o usuário a confiar só na sua palavra — o que é muito pedir de um estranho.</p>

      <h2>Erro 5: Não pensar em SEO desde o início</h2>
      <p>SEO não é algo que se adiciona depois. Estrutura de URLs, hierarquia de títulos (H1, H2, H3), velocidade e textos alternativos nas imagens precisam ser planejados desde o primeiro dia.</p>
      <div class="artigo-callout">
        <p>💡 Refatorar um site para SEO depois de pronto custa <strong>3x mais</strong> do que construí-lo corretamente desde o início.</p>
      </div>
    `
  },

  {
    slug: "seo-tecnico",
    categoria: "Desenvolvimento Web",
    titulo: "SEO técnico: o que é e por que o seu site precisa ser otimizado desde o início",
    data: "25 de abril de 2026",
    leitura: "7 min de leitura",
    autor: "Mirai Tech",
    conteudo: `
      <p>Quando a maioria das pessoas fala em SEO, pensa em palavras-chave e conteúdo. Mas existe uma camada invisível — o <strong>SEO técnico</strong> — que determina se o Google sequer consegue encontrar e indexar seu site.</p>

      <h2>O que é SEO técnico?</h2>
      <p>SEO técnico é o conjunto de otimizações feitas no código e na infraestrutura do site para que os mecanismos de busca possam <strong>rastrear, indexar e ranquear</strong> suas páginas corretamente.</p>

      <h2>Core Web Vitals: a métrica que o Google usa</h2>
      <p>Desde 2021, o Google usa três métricas de experiência do usuário como fator de ranqueamento:</p>
      <div class="artigo-table-wrap">
        <table class="artigo-table">
          <thead><tr><th>Métrica</th><th>O que mede</th><th>Meta</th></tr></thead>
          <tbody>
            <tr><td>LCP</td><td>Tempo para carregar o maior elemento visível</td><td>Menos de 2.5s</td></tr>
            <tr><td>FID / INP</td><td>Tempo de resposta à primeira interação</td><td>Menos de 200ms</td></tr>
            <tr><td>CLS</td><td>Estabilidade visual da página</td><td>Menos de 0.1</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Checklist de SEO técnico essencial</h2>
      <ul>
        <li><strong>HTTPS ativo</strong> — sites sem SSL são penalizados e marcados como inseguros</li>
        <li><strong>Sitemap XML</strong> — mapa do site enviado ao Google Search Console</li>
        <li><strong>Robots.txt</strong> — instrui o Googlebot sobre o que rastrear</li>
        <li><strong>URLs amigáveis</strong> — /sobre-nos em vez de /page?id=42</li>
        <li><strong>Meta tags corretas</strong> — title único e description em cada página</li>
        <li><strong>Dados estruturados</strong> — Schema.org para rich snippets no Google</li>
        <li><strong>Imagens com alt text</strong> — descrição textual de cada imagem</li>
      </ul>

      <div class="artigo-callout">
        <p>💡 Sites com SEO técnico bem implementado aparecem nos resultados do Google em <strong>até 4x mais buscas</strong> do que sites sem otimização.</p>
      </div>

      <h2>Por que fazer desde o início?</h2>
      <p>Migrar um site já existente para seguir as boas práticas de SEO técnico é trabalhoso e arriscado — mudanças de URL podem derrubar posições conquistadas. Construir certo desde o início é sempre o caminho mais inteligente.</p>
    `
  },

  {
    slug: "ecommerce-conversao",
    categoria: "E-commerce",
    titulo: "Como estruturar um e-commerce que realmente vende: do design ao checkout",
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

  {
    slug: "landing-pages-que-convertem",
    categoria: "Marketing",
    titulo: "Landing pages que convertem: o que toda empresa precisa saber antes de criar a sua",
    data: "15 de abril de 2026",
    leitura: "6 min de leitura",
    autor: "Mirai Tech",
    conteudo: `
      <p>Uma landing page não é um site. É uma página com <strong>um único objetivo</strong>: converter o visitante em lead ou cliente. E é exatamente por ter esse foco que ela converte muito mais do que uma home page genérica.</p>

      <h2>A estrutura que funciona</h2>
      <p>Após analisar centenas de landing pages de alto desempenho, identificamos um padrão que aparece consistentemente nas páginas com melhor conversão:</p>
      <ul>
        <li><strong>Headline poderosa</strong> — comunica o benefício principal em menos de 10 palavras</li>
        <li><strong>Subheadline</strong> — explica como o benefício é entregue</li>
        <li><strong>CTA acima da dobra</strong> — o botão de ação deve ser visível sem rolar a página</li>
        <li><strong>Prova social</strong> — depoimentos, logos de clientes, números reais</li>
        <li><strong>Benefícios, não funcionalidades</strong> — o que o cliente ganha, não o que o produto faz</li>
        <li><strong>Garantia ou redução de risco</strong> — "sem compromisso", "cancele quando quiser"</li>
      </ul>

      <div class="artigo-callout">
        <p>💡 Landing pages com <strong>um único CTA</strong> convertem até 266% a mais do que páginas com múltiplos links e opções.</p>
      </div>

      <h2>Copywriting: o que realmente vende</h2>
      <p>O texto da sua landing page precisa responder três perguntas em menos de 5 segundos: <em>O que é isso? Para quem é? Por que devo me importar?</em> Se o visitante precisar rolar para descobrir, você já perdeu a maioria deles.</p>

      <h2>Elementos visuais que aumentam conversão</h2>
      <ul>
        <li><strong>Vídeo de apresentação</strong> — aumenta o tempo na página em até 80%</li>
        <li><strong>Imagens de pessoas reais</strong> — geram mais confiança que ilustrações</li>
        <li><strong>Contador regressivo</strong> — cria senso de urgência em ofertas limitadas</li>
        <li><strong>Formulário curto</strong> — peça só o essencial (nome e e-mail já bastam para começar)</li>
      </ul>

      <h2>Teste, meça, repita</h2>
      <p>Nenhuma landing page nasce perfeita. O segredo das páginas de alto desempenho é o teste A/B contínuo: trocar a cor do botão, mudar a headline, reorganizar os blocos. Pequenas mudanças podem dobrar sua taxa de conversão.</p>
    `
  },

  {
    slug: "site-profissional-investimento",
    categoria: "Negócios",
    titulo: "Por que ter um site profissional ainda é o melhor investimento digital para seu negócio",
    data: "10 de abril de 2026",
    leitura: "5 min de leitura",
    autor: "Mirai Tech",
    conteudo: `
      <p>Com o crescimento das redes sociais, muitos empresários questionam: <em>"Preciso mesmo de um site?"</em>. A resposta é sim — e nunca foi tão importante quanto hoje.</p>

      <h2>Você não é dono das redes sociais</h2>
      <p>Seu perfil no Instagram pode ser <strong>banido, hackeado ou simplesmente deixar de existir</strong> amanhã. Já aconteceu com milhares de empresas. O seu site, hospedado no seu domínio, é o único canal digital que está completamente sob seu controle.</p>

      <div class="artigo-callout">
        <p>💡 Em 2021, o Facebook ficou fora do ar por 6 horas. Empresas que dependiam exclusivamente da plataforma perderam um dia inteiro de vendas.</p>
      </div>

      <h2>Credibilidade que as redes não entregam</h2>
      <p>Pesquisas mostram que <strong>75% dos consumidores julgam a credibilidade de uma empresa pelo site</strong>. Um site profissional comunica seriedade, organização e comprometimento — qualidades que uma bio do Instagram simplesmente não consegue transmitir.</p>

      <h2>SEO: clientes que chegam sem você pagar por anúncio</h2>
      <p>Um site bem otimizado aparece no Google quando alguém busca pelo seu serviço. Esse tráfego orgânico é gratuito e constante — diferente dos anúncios pagos, que param de funcionar no momento em que você para de pagar.</p>

      <h2>O ROI de um site profissional</h2>
      <div class="artigo-table-wrap">
        <table class="artigo-table">
          <thead><tr><th>Canal</th><th>Custo mensal</th><th>Você controla?</th><th>Gera SEO?</th></tr></thead>
          <tbody>
            <tr><td>Site profissional</td><td>Baixo (hospedagem)</td><td>Sim</td><td>Sim</td></tr>
            <tr><td>Instagram</td><td>Gratuito</td><td>Não</td><td>Não</td></tr>
            <tr><td>Google Ads</td><td>Alto e variável</td><td>Parcialmente</td><td>Não</td></tr>
            <tr><td>WhatsApp Business</td><td>Gratuito</td><td>Não</td><td>Não</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Quando o site se paga</h2>
      <p>Para a maioria das empresas, um site profissional se paga com <strong>um único cliente novo</strong> que chegou por lá. A partir daí, todo cliente adicional é lucro puro sobre o investimento inicial.</p>
    `
  },

  {
    slug: "mobile-first",
    categoria: "Responsividade",
    titulo: "Mobile-first: por que seu site precisa ser perfeito no celular antes de qualquer outra coisa",
    data: "5 de abril de 2026",
    leitura: "6 min de leitura",
    autor: "Mirai Tech",
    conteudo: `
      <p>Em 2026, mais de <strong>62% de todo o tráfego web brasileiro</strong> vem de dispositivos móveis. Se o seu site foi projetado pensando primeiro no desktop, você está ignorando a maioria dos seus visitantes.</p>

      <h2>Mobile-first não é só "fazer funcionar no celular"</h2>
      <p>Responsividade e mobile-first são conceitos diferentes. Um site responsivo <em>adapta</em> o layout desktop para telas menores. Um site mobile-first é <em>projetado para o celular primeiro</em> e depois expandido para telas maiores — o que resulta em uma experiência muito superior no dispositivo mais usado.</p>

      <div class="artigo-callout">
        <p>💡 O Google usa o <strong>Mobile-First Indexing</strong> desde 2019: a versão mobile do seu site é a que define seu ranqueamento, independentemente de como ele aparece no desktop.</p>
      </div>

      <h2>Princípios do design mobile-first</h2>
      <ul>
        <li><strong>Hierarquia de conteúdo</strong> — o mais importante aparece primeiro, sem precisar rolar</li>
        <li><strong>Botões tocáveis</strong> — área mínima de toque de 44x44px (recomendação da Apple)</li>
        <li><strong>Tipografia legível</strong> — mínimo de 16px para texto corrido</li>
        <li><strong>Formulários simplificados</strong> — menos campos, teclado correto para cada input</li>
        <li><strong>Imagens otimizadas</strong> — tamanhos diferentes para telas diferentes (srcset)</li>
      </ul>

      <h2>O impacto na velocidade</h2>
      <p>Redes móveis são mais lentas e instáveis que conexões de cabo. Um site mobile-first é construído com performance como prioridade: menos recursos carregados, imagens menores, menos JavaScript bloqueante.</p>

      <div class="artigo-table-wrap">
        <table class="artigo-table">
          <thead><tr><th>Abordagem</th><th>Tamanho médio da página</th><th>Tempo de carregamento (4G)</th></tr></thead>
          <tbody>
            <tr><td>Desktop-first adaptado</td><td>3.2 MB</td><td>4.8s</td></tr>
            <tr><td>Mobile-first</td><td>1.1 MB</td><td>1.6s</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Como verificar se seu site é mobile-friendly</h2>
      <p>Use o <strong>Google PageSpeed Insights</strong> (pagespeed.web.dev) para testar seu site. Uma pontuação abaixo de 70 no mobile indica problemas sérios que estão afastando visitantes e prejudicando seu SEO.</p>
    `
  },

  {
    slug: "seguranca-digital-2026",
    categoria: "Segurança Digital",
    titulo: "SSL, LGPD e boas práticas: como proteger seu site e seus clientes em 2026",
    data: "1 de abril de 2026",
    leitura: "8 min de leitura",
    autor: "Mirai Tech",
    conteudo: `
      <p>Segurança digital deixou de ser assunto exclusivo de grandes empresas. Em 2026, qualquer site que coleta dados de usuários — mesmo que seja só um nome e e-mail — precisa seguir um conjunto mínimo de boas práticas. Ignorar isso pode custar caro.</p>

      <h2>HTTPS: o mínimo absoluto</h2>
      <p>O certificado SSL (que transforma HTTP em HTTPS) criptografa a comunicação entre o navegador do usuário e o seu servidor. Sem ele, o Google marca seu site como <strong>"Não seguro"</strong> na barra de endereço — o que afasta visitantes e prejudica o SEO.</p>
      <div class="artigo-callout">
        <p>💡 Certificados SSL básicos são <strong>gratuitos</strong> via Let's Encrypt e levam menos de 5 minutos para ativar na maioria das hospedagens.</p>
      </div>

      <h2>LGPD: o que sua empresa precisa fazer</h2>
      <p>A Lei Geral de Proteção de Dados (Lei 13.709/2018) se aplica a qualquer site ou aplicação que colete dados de usuários brasileiros. As obrigações básicas incluem:</p>
      <ul>
        <li><strong>Política de privacidade</strong> — documento claro sobre quais dados são coletados e como são usados</li>
        <li><strong>Consentimento explícito</strong> — o usuário precisa aceitar o uso de cookies e dados ativamente</li>
        <li><strong>Direito de exclusão</strong> — o usuário pode pedir para apagar seus dados a qualquer momento</li>
        <li><strong>Notificação de vazamentos</strong> — incidentes precisam ser comunicados à ANPD</li>
      </ul>

      <h2>Checklist de segurança para 2026</h2>
      <div class="artigo-table-wrap">
        <table class="artigo-table">
          <thead><tr><th>Item</th><th>Prioridade</th><th>Custo</th></tr></thead>
          <tbody>
            <tr><td>Certificado SSL ativo</td><td>Crítica</td><td>Gratuito</td></tr>
            <tr><td>Backups automáticos diários</td><td>Alta</td><td>Baixo</td></tr>
            <tr><td>Firewall de aplicação (WAF)</td><td>Alta</td><td>Médio</td></tr>
            <tr><td>Política de privacidade</td><td>Alta</td><td>Baixo</td></tr>
            <tr><td>Autenticação em dois fatores no painel</td><td>Alta</td><td>Gratuito</td></tr>
            <tr><td>Atualizações de plugins/CMS em dia</td><td>Média</td><td>Gratuito</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Proteção contra ataques comuns</h2>
      <ul>
        <li><strong>SQL Injection</strong> — nunca concatene inputs de usuário diretamente em queries SQL</li>
        <li><strong>XSS (Cross-Site Scripting)</strong> — sanitize todo conteúdo gerado por usuários antes de exibir</li>
        <li><strong>Força bruta</strong> — limite tentativas de login e use senhas fortes no painel admin</li>
        <li><strong>DDoS</strong> — use uma CDN com proteção integrada (Cloudflare tem plano gratuito)</li>
      </ul>

      <p>Na Mirai Tech, todos os projetos já saem com SSL configurado, headers de segurança otimizados e orientações de LGPD incluídas. Segurança não é um extra — é parte do que significa entregar um site profissional.</p>
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