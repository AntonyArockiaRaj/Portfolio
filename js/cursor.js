(() => {
    'use strict';

    /* ================= Custom cursor ================= */
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (!isTouch && cursorDot && cursorRing) {
        let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', e => {
            mouseX = e.clientX; mouseY = e.clientY;
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateRing);
        }
        animateRing();

        document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
        });
    } else {
        cursorDot?.remove();
        cursorRing?.remove();
    }

})();
