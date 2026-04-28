  const track         = document.getElementById('carouselTrack');
  const btnPrev       = document.getElementById('btnPrev');
  const btnNext       = document.getElementById('btnNext');
  const dotsContainer = document.getElementById('dots');

  const cards = track.querySelectorAll('.card');
  const total = cards.length;
  let current       = 0;
  let autoplayTimer = null;

  function getVisible() {
    return window.innerWidth <= 700 ? 1 : 3;
  }

  // ── DOTS ──
  function buildDots() {
    dotsContainer.innerHTML = '';
    const totalDots = total - getVisible() + 1;
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  // ── MOVIMENTO ──
  function getCardWidth() {
    return (track.parentElement.offsetWidth - 80) / getVisible();
  }

  function goTo(index) {
    const maxIndex = total - getVisible();
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * getCardWidth()}px)`;
    updateDots();
  }

  function moveCarousel(direction) {
    goTo(current + direction);
  }

  // ── SETAS ──
  btnPrev.addEventListener('click', () => { moveCarousel(-1); resetAutoplay(); });
  btnNext.addEventListener('click', () => { moveCarousel(1);  resetAutoplay(); });

  // ── AUTOPLAY ──
  function startAutoplay() { autoplayTimer = setInterval(() => moveCarousel(1), 4000); }
  function stopAutoplay()  { clearInterval(autoplayTimer); }
  function resetAutoplay() { stopAutoplay(); startAutoplay(); }

  track.parentElement.addEventListener('mouseenter', stopAutoplay);
  track.parentElement.addEventListener('mouseleave', startAutoplay);

  // ── SWIPE ──
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAutoplay(); }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) moveCarousel(diff > 0 ? 1 : -1);
    startAutoplay();
  }, { passive: true });

  // ── TECLADO ──
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  moveCarousel(-1);
    if (e.key === 'ArrowRight') moveCarousel(1);
  });

  // ── RESIZE ──
  window.addEventListener('resize', () => { buildDots(); goTo(0); });

  // ── INIT ──
  buildDots();
  startAutoplay();