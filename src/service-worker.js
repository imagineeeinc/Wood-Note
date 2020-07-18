importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");

if (workbox) {
    console.log("Yay! Workbox is loaded !");
    workbox.precaching.precacheAndRoute([]);

    /*  cache images in the e.g others folder; edit to other folders you got
    and config in the sw-config.js file
    */
    workbox.routing.registerRoute(
        /(.*)others(.*)\.(?:png|gif|jpg)/,
        new workbox.strategies.CacheFirst({
            cacheName: "images",
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                })
            ]
        })
    );
    /* Make your JS and CSS âš¡ fast by returning the assets from the cache,
     while making sure they are updated in the background for the next use.
    */
    workbox.routing.registerRoute(
    // cache js, css, scc files
        /.*\.(?:css|js|scss|)/,
        // use cache but update in the background ASAP
        new workbox.strategies.StaleWhileRevalidate({
            // use a custom cache name
            cacheName: "assets",
        })
    );

    // cache google fonts
    workbox.routing.registerRoute(
        new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
        new workbox.strategies.CacheFirst({
            cacheName: "google-fonts",
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    // add offline analytics
    workbox.googleAnalytics.initialize();

    /* Install a new service worker and have it update
   and control a web page as soon as possible
    */

    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

} else {
    console.log("Oops! Workbox didn't load");
}

/*self.addEventListener("activate", event => {
  self.clients.claim();
});

evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);

evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);

if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  //return;
}
evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
);

const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';

const FILES_TO_CACHE = [
  '',
  'index.html',
  'app.js',
  'FileSaver.js',
  'manifest.json.js',
  'style.css',
];
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  //return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
)};*/