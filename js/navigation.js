(() => {
    'use strict';

    /* ================= Navbar scroll + active link ================= */
    const navbar = document.getElementById('mainNav');
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav-link');

    function onScroll() {
        navbar?.classList.toggle('scrolled', window.scrollY > 40);

        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 160;
            if (window.scrollY >= top) current = section.id;
        });
        navLinkEls.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });

        const scrollBtn = document.getElementById('scrollTopBtn');
        scrollBtn?.classList.toggle('show', window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ================= Mobile nav toggle ================= */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle?.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinkEls.forEach(link => link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle?.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
    }));

    /* ================= Back to top ================= */
    document.getElementById('scrollTopBtn')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

})();
