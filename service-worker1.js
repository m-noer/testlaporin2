// sw.js

// CACHE_NAMESPACE
// CacheStorage is shared between all sites under same domain.
// A namespace can prevent potential name conflicts and mis-deletion.
const CACHE_NAMESPACE = 'laporin-'

const PRECACHE = CACHE_NAMESPACE + 'precache-v3'
const PRECACHE_LIST = [
  '/',
  '/css/style.css',
  '/css/bootstrap-grid.css',
  'font-awesome/css/font-awesome.min.css',
  '/js/main.js',
  '/js/vue.min.js',
  '/js/jquery.min.js',
  '/js/hammer.min.js',
  'images/profil.jpeg',
  'images/profil1.jpg',
  'images/profil2.jpg',
  'images/profil3.jpg',
  'images/profil4.jpg',
  'button-09.mp3'
]
const RUNTIME = CACHE_NAMESPACE + 'runtime-v1'
const expectedCaches = [PRECACHE, RUNTIME]


self.oninstall = (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
    .then(cache => cache.addAll(PRECACHE_LIST))
    .then(self.skipWaiting())
    .catch(err => console.log(err))
  )
}

self.onactivate = (event) => {
  // delete any cache not match expectedCaches for migration.
  // noticed that we delete by cache instead of by request here.
  // so we MUST filter out caches opened by this app firstly.
  // check out sw-precache or workbox-build for an better way.
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames
        .filter(cacheName => cacheName.startsWith(CACHE_NAMESPACE))
        .filter(cacheName => !expectedCaches.includes(cacheName))
        .map(cacheName => caches.delete(cacheName))
    ))
  )
}

self.onfetch = (event) => {
  // Fastest-while-revalidate
  const cached = caches.match(event.request);
  const fixedUrl = `${event.request.url}?${Date.now()}`;
  const fetched = fetch(fixedUrl, {cache: "no-store"});
  const fetchedCopy = fetched.then(resp => resp.clone());
  console.log(`fetch ${fixedUrl}`)

  // Call respondWith() with whatever we get first.
  // If the fetch fails (e.g disconnected), wait for the cache.
  // If there’s nothing in cache, wait for the fetch.
  // If neither yields a response, return offline pages.
  event.respondWith(
    Promise.race([fetched.catch(_ => cached), cached])
      .then(resp => resp || fetched)
      .catch(_ => caches.match('offline.html'))
  );

  // Update the cache with the version we fetched (only for ok status)
  event.waitUntil(
    Promise.all([fetchedCopy, caches.open(RUNTIME)])
      .then(([response, cache]) => response.ok && cache.put(event.request, response))
      .catch(_ => {/* eat any errors */})
  );
}
