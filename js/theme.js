(() => {
    'use strict';

    /* ================= Theme toggle (dark default, light optional) ================= */
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('portfolio-theme');
    root.setAttribute('data-theme', savedTheme || 'dark');

    themeToggle?.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
    });

})();
