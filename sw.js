const CACHE_NAME = 'stgym-v35';
const ASSETS = [
  './',
  './index.html',
  './cases.js',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => {
      return self.clients.matchAll({type: 'window'}).then(clients => {
        clients.forEach(client => client.navigate(client.url));
      });
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // API calls: always network
  if (url.hostname === 'generativelanguage.googleapis.com' ||
      url.hostname.includes('firebaseio.com')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // Google Fonts: cache-first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      }))
    );
    return;
  }

  // index.html + cases.json: NETWORK-FIRST (always get latest, fallback to cache)
  if (e.request.mode === 'navigate' || 
      url.pathname.endsWith('index.html') || 
      url.pathname.endsWith('cases.json') ||
      url.pathname.endsWith('/')) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Other assets: cache-first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      if (res.ok) {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
