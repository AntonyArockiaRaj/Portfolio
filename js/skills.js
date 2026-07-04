(() => {
    'use strict';

    /* ================= Skills tab filter ================= */
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const cat = tab.dataset.cat;
            skillCards.forEach(card => {
                card.classList.toggle('hidden-cat', cat !== 'all' && card.dataset.cat !== cat);
            });
        });
    });

})();
