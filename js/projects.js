(() => {
    'use strict';

    /* ================= Project filter + search ================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectSearch = document.getElementById('projectSearch');
    const noResults = document.getElementById('noProjectResults');
    let activeFilter = 'all';

    function applyProjectFilters() {
        const query = (projectSearch?.value || '').trim().toLowerCase();
        let visibleCount = 0;
        projectCards.forEach(card => {
            const cats = card.dataset.cats.split(' ');
            const matchesFilter = activeFilter === 'all' || cats.includes(activeFilter);
            const text = card.textContent.toLowerCase();
            const matchesSearch = !query || text.includes(query);
            const show = matchesFilter && matchesSearch;
            card.classList.toggle('filtered-out', !show);
            if (show) visibleCount++;
        });
        if (noResults) noResults.hidden = visibleCount !== 0;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            applyProjectFilters();
        });
    });
    projectSearch?.addEventListener('input', applyProjectFilters);

})();
