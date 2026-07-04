(() => {
    'use strict';

    /* ================= Certification preview modal ================= */
    const certModal = document.getElementById('certModal');
    if (!certModal) return;

    const certModalImageWrap = document.getElementById('certModalImageWrap');
    const certModalImage = document.getElementById('certModalImage');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalOrg = document.getElementById('certModalOrg');
    const certModalNoLabel = document.getElementById('certModalNoLabel');
    const certModalNo = document.getElementById('certModalNo');
    const certModalDate = document.getElementById('certModalDate');
    const certModalAreas = document.getElementById('certModalAreas');

    let lastFocused = null;

    function openCertModal(card) {
        const image = card.dataset.certImage;
        if (image) {
            certModalImage.src = image;
            certModalImage.alt = `${card.dataset.certTitle} certificate`;
            certModalImageWrap.href = image;
            certModalImageWrap.hidden = false;
        } else {
            certModalImageWrap.hidden = true;
            certModalImageWrap.removeAttribute('href');
            certModalImage.removeAttribute('src');
        }

        certModalTitle.textContent = card.dataset.certTitle;
        certModalOrg.textContent = card.dataset.certOrg;
        certModalNoLabel.textContent = card.dataset.certNoLabel || 'Certificate No.';
        certModalNo.textContent = card.dataset.certNo;
        certModalDate.textContent = card.dataset.certDate;
        certModalAreas.textContent = card.dataset.certAreas;

        lastFocused = document.activeElement;
        certModal.classList.add('open');
        certModal.setAttribute('aria-hidden', 'false');
        document.getElementById('certModalClose')?.focus();
    }

    function closeCertModal() {
        certModal.classList.remove('open');
        certModal.setAttribute('aria-hidden', 'true');
        lastFocused?.focus();
    }

    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => openCertModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCertModal(card); }
        });
    });
    document.getElementById('certModalClose')?.addEventListener('click', closeCertModal);
    document.getElementById('certModalBackdrop')?.addEventListener('click', closeCertModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCertModal(); });

})();
