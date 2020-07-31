importScripts('/app.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
        `/`,
        `/index.html`,
        `/src/style.css`,
        `/src/app.js`,
        `/src/emojiPicker.js`,
        `/Favicon/favicon.ico`,
        `/offline.html`,
        `/manifest.json`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
 });

 self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
 
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
 });