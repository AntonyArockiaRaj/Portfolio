(() => {
    'use strict';

    /* ================= Contact form (mailto handoff, client-side validation) ================= */
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;
        this.querySelectorAll('.form-error').forEach(el => el.textContent = '');

        const name = this.name.value.trim();
        const email = this.email.value.trim();
        const message = this.message.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function setError(field, msg) {
            field.parentElement.querySelector('.form-error').textContent = msg;
        }

        if (!name) { setError(this.name, 'Please enter your name'); valid = false; }
        if (!emailPattern.test(email)) { setError(this.email, 'Please enter a valid email'); valid = false; }
        if (!message) { setError(this.message, 'Please enter a message'); valid = false; }

        if (!valid) return;

        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:antonyarockiaraj107@gmail.com?subject=${subject}&body=${body}`;

        const note = document.getElementById('formNote');
        if (note) note.textContent = 'Opening your email client to send this message...';
        this.reset();
    });

})();
