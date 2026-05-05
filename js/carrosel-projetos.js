/* =============================================
   PORTFÓLIO PAGE — scriptPortifolios.js
   Mesmo padrão e estrutura do site principal
   ============================================= */

(function () {
    'use strict';

    /* ─────────────────────────────────────────
       HEADER SCROLL EFFECT
    ───────────────────────────────────────── */
    const header = document.querySelector('.header-main');
    if (header) {
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ─────────────────────────────────────────
       HAMBURGER MENU
    ───────────────────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileNav.classList.toggle('open');
        });
    }

    window.closeMobileNav = function () {
        if (hamburger) hamburger.classList.remove('active');
        if (mobileNav) mobileNav.classList.remove('open');
    };


    /* ─────────────────────────────────────────
       CARROSEL EM DESTAQUE
    ───────────────────────────────────────── */
    const track = document.getElementById('carroselTrack');
    const dotsRow = document.getElementById('carroselDots');
    const curEl = document.getElementById('carroselCur');
    const totEl = document.getElementById('carroselTot');
    const btnPrev = document.getElementById('prev');
    const btnNext = document.getElementById('next');
    const carroselSection = document.querySelector('.section-carrosel');

    if (track) {
        const items = track.querySelectorAll('.carrosel-item');
        const total = items.length;
        let cur = 0;
        let autoTimer = null;

        // largura dinâmica baseada no viewport do carrosel
        function getItemWidth() {
            return track.querySelector('.carrosel-item')?.offsetWidth || 0;
        }

        // atualiza total
        if (totEl) totEl.textContent = String(total).padStart(2, '0');

        // cria dots
        if (dotsRow) {
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
                dot.addEventListener('click', () => { goTo(i); resetAuto(); });
                dotsRow.appendChild(dot);
            }
        }

        function goTo(n) {
            cur = ((n % total) + total) % total;
            track.style.transform = `translateX(-${cur * getItemWidth()}px)`;
            if (curEl) curEl.textContent = String(cur + 1).padStart(2, '0');
            if (dotsRow) {
                dotsRow.querySelectorAll('.dot').forEach((d, i) =>
                    d.classList.toggle('active', i === cur)
                );
            }
        }

        function startAuto() { autoTimer = setInterval(() => goTo(cur + 1), 4500); }
        function stopAuto() { clearInterval(autoTimer); }
        function resetAuto() { stopAuto(); startAuto(); }

        if (btnPrev) btnPrev.addEventListener('click', () => { goTo(cur - 1); resetAuto(); });
        if (btnNext) btnNext.addEventListener('click', () => { goTo(cur + 1); resetAuto(); });

        if (carroselSection) {
            carroselSection.addEventListener('mouseenter', stopAuto);
            carroselSection.addEventListener('mouseleave', startAuto);
        }

        // recalcula posição ao redimensionar
        window.addEventListener('resize', () => goTo(cur), { passive: true });

        // touch / swipe
        let touchStartX = 0;
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;

        track.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            startX = e.touches[0].clientX;
            isDragging = true;
            currentTranslate = -cur * getItemWidth();
            stopAuto();
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
            const threshold = getItemWidth() * 0.3; // 30% of item width
            if (Math.abs(diff) > threshold) {
                goTo(cur + (diff > 0 ? 1 : -1));
            } else {
                goTo(cur); // Snap back
            }
            startAuto();
        }, { passive: true });

        // teclado
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') { goTo(cur - 1); resetAuto(); }
            if (e.key === 'ArrowRight') { goTo(cur + 1); resetAuto(); }
        });

        startAuto();
    }


    /* ─────────────────────────────────────────
       FILTRO DE CATEGORIAS
    ───────────────────────────────────────── */
    const categoriaBtns = document.querySelectorAll('.item-Categoria');
    const projetoCards = document.querySelectorAll('.projeto-card');
    const projetosEmpty = document.getElementById('projetosEmpty');
    const btnLimpar = document.getElementById('btnLimparFiltro');

    if (categoriaBtns.length && projetoCards.length) {

        function filterCards(filtro) {
            let visiveis = 0;

            projetoCards.forEach(card => {
                const cat = (card.dataset.categoria || '').toLowerCase();
                const match = filtro === 'todos' || cat === filtro;

                if (match) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(16px) scale(0.97)';
                    visiveis++;
                    // anima entrada com stagger
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        });
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px) scale(0.97)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') card.style.display = 'none';
                    }, 280);
                }
            });

            // estado vazio
            if (projetosEmpty) {
                projetosEmpty.style.display = visiveis === 0 ? 'block' : 'none';
            }
        }

        // transição CSS nos cards
        projetoCards.forEach((card, i) => {
            card.style.transition = 'opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)';
            card.style.transitionDelay = `${i * 30}ms`;
        });

        categoriaBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoriaBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterCards(btn.dataset.filter);
            });
        });

        // botão "Ver todos" do estado vazio
        if (btnLimpar) {
            btnLimpar.addEventListener('click', () => {
                categoriaBtns.forEach(b => b.classList.remove('active'));
                document.querySelector('[data-filter="todos"]')?.classList.add('active');
                filterCards('todos');
            });
        }
    }


    /* ─────────────────────────────────────────
       SCROLL REVEAL — mesmo padrão do site
    ───────────────────────────────────────── */
    if ('IntersectionObserver' in window) {
        const revealEls = document.querySelectorAll('.reveal');

        revealEls.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(28px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)';
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealEls.forEach(el => observer.observe(el));


        // Stagger nos cards do grid ao entrar na viewport
        const grid = document.getElementById('projetosGrid');
        if (grid) {
            const gridObserver = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    document.querySelectorAll('.projeto-card').forEach((card, i) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, i * 60);
                    });
                    gridObserver.unobserve(grid);
                }
            }, { threshold: 0.05 });

            // estado inicial dos cards
            document.querySelectorAll('.projeto-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(24px)';
                card.style.transition = 'opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)';
            });

            gridObserver.observe(grid);
        }
    }

})();