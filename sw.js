const CACHE_NAME = 'nomina-cache-v1';
const urlsToCache = [
  '/calculadora-cambio-nomina/',
  '/calculadora-cambio-nomina/index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  // Las imágenes de billetes/monedas se cachearán automáticamente en el primer uso.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si está en caché, lo devuelve. Si no, va a la red.
        return response || fetch(event.request)
          .then((fetchResponse) => {
            // Y guarda la nueva respuesta en caché para la próxima vez
            return caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
              });
          });
      })
  );
});