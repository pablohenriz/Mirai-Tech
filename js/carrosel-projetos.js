(function () {
    const track = document.getElementById('carroselTrack');
    const items = track.querySelectorAll('.carrosel-item');
    const total = items.length;
    const curEl = document.getElementById('carroselCur');
    const totEl = document.getElementById('carroselTot');
    const dotsRow = document.getElementById('carroselDots');
    const ITEM_W = 1300;
    let cur = 0, autoTimer;

    if (totEl) totEl.textContent = String(total).padStart(2, '0');

    for (let i = 0; i < total; i++) {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.onclick = () => go(i);
        dotsRow.appendChild(d);
    }

    function go(n) {
        cur = (n + total) % total;
        track.style.transform = `translateX(-${cur * ITEM_W}px)`;
        if (curEl) curEl.textContent = String(cur + 1).padStart(2, '0');
        dotsRow.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === cur));
    }

    document.getElementById('prev').onclick = () => go(cur - 1);
    document.getElementById('next').onclick = () => go(cur + 1);

    function startAuto() { autoTimer = setInterval(() => go(cur + 1), 4000); }
    function stopAuto() { clearInterval(autoTimer); }

    const section = document.querySelector('.section-hero');
    section.addEventListener('mouseenter', stopAuto);
    section.addEventListener('mouseleave', startAuto);
    startAuto();

    let touchX = 0;
    track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; });
    track.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
    });
})();




// filtro de itens de categoria com o meu js no portifolios
document.querySelectorAll('.item-Categoria').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.item-Categoria').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});