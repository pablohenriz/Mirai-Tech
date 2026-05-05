// =============================================
// CARROSSEL DE PROJETOS
// =============================================

const track = document.getElementById('carrosselTrack');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const cntCur = document.getElementById('cntCur');
const cntTot = document.getElementById('cntTot');
const dotsWrap = document.getElementById('carrosselDots');

const cards = track.querySelectorAll('.projeto-item');
const total = cards.length;
const gap = 24;
let cur = 0;

cntTot.textContent = String(total).padStart(2, '0');

// ── Quantos cards visíveis por breakpoint ──
function visibleCards() {
  const w = window.innerWidth;
  if (w <= 600) return 1;      // mobile pequeno: 1 card
  if (w <= 1024) return 2;      // tablet / laptop: 2 cards
  return 3;                     // desktop grande: 3 cards
}

// ── Ajusta largura dos cards dinamicamente ──
function setProjetoCardWidths() {
  const vis = visibleCards();
  const wrap = track.parentElement;

  // Desconta padding real do wrap
  const style = window.getComputedStyle(wrap);
  const pl = parseFloat(style.paddingLeft) || 0;
  const pr = parseFloat(style.paddingRight) || 0;
  const availableWidth = wrap.offsetWidth - pl - pr;

  const totalGaps = gap * (vis - 1);

  // Mobile: 90% para dar dica visual de "há mais cards"
  const cardWidth = vis === 1
    ? availableWidth * 0.90
    : (availableWidth - totalGaps) / vis;

  cards.forEach(card => {
    card.style.minWidth = cardWidth + 'px';
    card.style.width = cardWidth + 'px';
  });
}

function projetoCardW() {
  return cards[0].offsetWidth + gap;
}

// ── Dots ──
function buildProjetoDots() {
  dotsWrap.innerHTML = '';
  const vis = visibleCards();
  const totalDots = Math.max(1, total - vis + 1);

  for (let i = 0; i < totalDots; i++) {
    const d = document.createElement('div');
    d.classList.add('dot');
    d.style.width = i === 0 ? '32px' : '16px';
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => irPara(i));
    dotsWrap.appendChild(d);
  }
}

// ── Atualiza UI ──
function atualizarUI() {
  const vis = visibleCards();
  const maxCur = total - vis;
  if (cur > maxCur) cur = maxCur;

  track.style.transform = `translateX(-${cur * projetoCardW()}px)`;
  cntCur.textContent = String(cur + 1).padStart(2, '0');
  btnPrev.disabled = cur === 0;
  btnNext.disabled = cur >= maxCur;

  dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
    const isActive = i === cur;
    d.classList.toggle('active', isActive);
    d.style.width = isActive ? '32px' : '16px';
  });
}

// ── Navegar ──
function irPara(index) {
  const vis = visibleCards();
  cur = Math.max(0, Math.min(index, total - vis));
  atualizarUI();
}

btnPrev.addEventListener('click', () => irPara(cur - 1));
btnNext.addEventListener('click', () => irPara(cur + 1));

// ── Swipe ──
let projTx = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;

track.addEventListener('touchstart', e => {
  projTx = e.touches[0].clientX;
  startX = e.touches[0].clientX;
  isDragging = true;
  currentTranslate = -cur * projetoCardW();
}, { passive: true });

track.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;
  const newTranslate = currentTranslate + diff;
  track.style.transform = `translateX(${newTranslate}px)`;
  e.preventDefault(); // Prevent scrolling
}, { passive: false });

track.addEventListener('touchend', e => {
  if (!isDragging) return;
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  const threshold = projetoCardW() * 0.3; // 30% of card width to trigger slide change
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      irPara(cur + 1); // Swipe left, next
    } else {
      irPara(cur - 1); // Swipe right, previous
    }
  } else {
    atualizarUI(); // Snap back
  }
}, { passive: true });

// ── Resize ──
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    setProjetoCardWidths();
    buildProjetoDots();
    irPara(0);
  }, 120);
});

// ── Header scroll ──
const header = document.querySelector('.header-main');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Init ──
setProjetoCardWidths();
buildProjetoDots();
atualizarUI();