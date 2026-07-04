(() => {
    'use strict';

    /* ================= Preloader + AOS ================= */
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => preloader.classList.add('hidden'), 400);
        }
        if (window.AOS) AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true, offset: 80 });
    });

    /* ================= Footer year ================= */
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ================= Service worker ================= */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').catch(() => {});
        });
    }

})();
