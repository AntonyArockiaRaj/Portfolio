(() => {
    'use strict';

    /* ================= Particle background (hero) ================= */
    const canvas = document.getElementById('particleCanvas');
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    const root = document.documentElement;
    let particles = [];
    const hero = canvas.closest('.hero');

    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function initParticles() {
        const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 0.6,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
        }));
    }

    function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isLight = root.getAttribute('data-theme') === 'light';
        ctx.fillStyle = isLight ? 'rgba(30,40,80,0.45)' : 'rgba(220,225,255,0.55)';
        ctx.strokeStyle = isLight ? 'rgba(30,40,80,0.12)' : 'rgba(200,210,255,0.12)';

        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(tick);
    }

    resizeCanvas();
    initParticles();
    tick();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

})();
