document.addEventListener('DOMContentLoaded', () => {

  const track = document.getElementById('avaliacoesTrack');
  const wrap = track.parentElement;
  const cards = track.querySelectorAll('.avaliacao-card');
  const dotsContainer = document.getElementById('avaliacoesDots');
  const modal = document.getElementById('avaliacao-modal');
  const total = cards.length;
  let cur = 0, timer;

  function visible() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  // ── AJUSTA LARGURA DOS CARDS DINAMICAMENTE ──
  function setCardWidths() {
    const gap = 24;
    const vis = visible();
    const totalGaps = gap * (vis - 1);
    const cardWidth = (wrap.offsetWidth - totalGaps) / vis;

    cards.forEach(card => {
      card.style.minWidth = cardWidth + 'px';
      card.style.width = cardWidth + 'px';
    });
  }

  function cardW() {
    const gap = 24;
    return cards[0].offsetWidth + gap;
  }

  // ── DOTS ──
  function buildDots() {
    dotsContainer.innerHTML = '';
    const totalDots = total - visible() + 1;
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === cur);
    });
  }

  // ── MOVER ──
  function goTo(i) {
    const max = total - visible();
    if (i < 0) i = max;
    if (i > max) i = 0;
    cur = i;
    track.style.transform = `translateX(-${cur * cardW()}px)`;
    updateDots();
  }

  // ── BOTÕES ──
  document.getElementById('btnAvalPrev').addEventListener('click', () => { goTo(cur - 1);  });
  document.getElementById('btnAvalNext').addEventListener('click', () => { goTo(cur + 1);  });

  // ── AUTOPLAY ──
  function start() { timer = setInterval(() => goTo(cur + 1), 4000); }
  function stop()  { clearInterval(timer); }
  function reset() { stop(); start(); }



  // ── SWIPE ──
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; stop(); }, { passive: true });
  track.addEventListener('touchend', e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 40) goTo(cur + (d > 0 ? 1 : -1));
    start();
  }, { passive: true });

  // ── RESIZE ──
  window.addEventListener('resize', () => {
    setCardWidths();
    buildDots();
    goTo(0);
  });

    // ── MODAL: ABRE ──
  cards.forEach(card => {
    card.addEventListener('click', () => {
      document.getElementById('modal-texto').textContent   = card.querySelector('p').textContent;
      document.getElementById('modal-nome').textContent    = card.querySelector('strong').textContent;
      document.getElementById('modal-empresa').textContent = card.querySelector('.avaliacao-autor span').textContent;
      document.getElementById('modal-avatar').textContent  = card.querySelector('.avaliacao-avatar').textContent;
      modal.style.display = 'flex';
      stop();
    });
  });

  // ── MODAL: FECHA ──
  document.getElementById('avaliacao-modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
    start();
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) { modal.style.display = 'none'; start(); }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'flex') { modal.style.display = 'none'; start(); }
  });

  // ── INIT ──
  setCardWidths();
  buildDots();
  

});