// SELECIONANDO ELEMENTOS DE HTML
const track = document.getElementById('carrosselTrack');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const cntCur = document.getElementById('cntCur');
const cntTot = document.getElementById('cntTot');
const dotsWrap = document.getElementById('carrosselDots');

// VARIÁVEIS DE CONTROLE
const cards = track.querySelectorAll('.projeto-item');
const total = cards.length;
const visible = 2;
const gap = 24;
let cur = 0;

// DEFININDO O TOTAL DE ITENS
cntTot.textContent = String(total).padStart(2, '0');

// Cria os dots
for (let i = 0; i <= total - visible; i++) {
    const d = document.createElement('div');
    d.classList.add('dot');
    d.style.width = i === 0 ? '32px' : '16px';
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => irPara(i));
    dotsWrap.appendChild(d);
}

// FUNÇÃO PARA ATUALIZAR A INTERFACE
function atualizarUI() {
    const cardW = cards[0].offsetWidth + gap;
    track.style.transform = `translateX(-${cur * cardW}px)`;

    cntCur.textContent = String(cur + 1).padStart(2, '0');
    btnPrev.disabled = cur === 0;
    btnNext.disabled = cur >= total - visible;

    dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
        const isActive = i === cur;
        d.classList.toggle('active', isActive);
        d.style.width = isActive ? '32px' : '16px';
    });
}

// FUNAÇÃO PARA IR PARA UM ÍNDICE ESPECÍFICO (MUDAR DE SLIDE)
function irPara(index) {
    cur = Math.max(0, Math.min(index, total - visible));
    atualizarUI();
}


// BOTÕES DE NAVEGAÇÃO
btnPrev.addEventListener('click', () => irPara(cur - 1));
btnNext.addEventListener('click', () => irPara(cur + 1));


const header = document.querySelector('.header-main');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


//  INICIALIZAÇÃO DA INTERFACE
atualizarUI();