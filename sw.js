/* Kit Formalízate — Vibras Positivas HM
   Service worker: cache-first para que la app abra sin datos. */

const CACHE = 'kit-formalizate-v2';
const ESENCIALES = [
  './',
  './index.html',
  './manifest.json'
];
const OPCIONALES = [
  './icon-192.png',
  './icon-512.png',
  './icon-maskable.png',
  './og-kit-formalizate.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll(ESENCIALES).then(() =>
        // Si falta algún ícono no se cae la instalación: se cachea lo que exista.
        Promise.all(OPCIONALES.map(u => cache.add(u).catch(() => null)))
      )
    ).then(() => self.skipWaiting())
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
    caches.match(event.request, { ignoreSearch: true }).then(guardado => {
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
