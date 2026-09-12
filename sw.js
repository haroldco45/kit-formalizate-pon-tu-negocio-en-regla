/* Kit Formalízate — Vibras Positivas HM
   Service worker: cache-first para que la app abra sin datos. */

const CACHE = 'kit-formalizate-v1';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(claves => Promise.all(
        claves.filter(c => c !== CACHE).map(c => caches.delete(c))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(guardado => {
      if (guardado) return guardado;
      return fetch(event.request).then(respuesta => {
        if (respuesta && respuesta.status === 200 && respuesta.type === 'basic') {
          const copia = respuesta.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copia));
        }
        return respuesta;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
