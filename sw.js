const CACHE_NAME = 'antony-portfolio-v3';
const CORE_ASSETS = [
    './',
    './index.html',
    './css/base.css',
    './css/layout.css',
    './css/hero.css',
    './css/components.css',
    './css/responsive.css',
    './js/theme.js',
    './js/navigation.js',
    './js/cursor.js',
    './js/particles.js',
    './js/counters.js',
    './js/skills.js',
    './js/projects.js',
    './js/certifications.js',
    './js/contact-form.js',
    './js/chatbot.js',
    './js/main.js',
    './manifest.json',
    './images/icon.png',
    './images/profile.jpg',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).catch(() => {})
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            const network = fetch(event.request)
                .then(response => {
                    if (response && response.status === 200) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    }
                    return response;
                })
                .catch(() => cached);
            return cached || network;
        })
    );
});
