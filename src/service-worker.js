console.log('Hello from service-worker.js');

if( 'function' === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
  //addEventListener('message', onMessage);    
}
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
import {registerRoute} from 'workbox-routing';

registerRoute(
  ({request}) => request.destination === 'script',
  /* ... */
);
import {registerRoute} from 'workbox-routing';
import {NetworkFirst} from 'workbox-strategies';

registerRoute(
  ({request}) => request.destination === 'script',
  new NetworkFirst()
);


import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

registerRoute(
  // Cache style resources, i.e. CSS files.
  ({request}) => request.destination === 'style',
  // Use cache but update in the background.
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache',
  })
);
registerRoute(
  // Cache image files.
  ({request}) => request.destination === 'image',
  // Use the cache if it's available.
  new CacheFirst({
    // Use a custom cache name.
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);

registerRoute(
  new RegExp('src/app.js'),
  jsHandler
);
registerRoute(
  new RegExp('src/style.css'),
  cssHandler
);
registerRoute(
  'src/emojiPicker.js',
  handler
);
registerRoute(
  'Favicon/favicon.ico',
  handler
);
registerRoute(
  '/manifest.json',
  handler
);

import * as strategies from 'workbox-strategies';

registerRoute(
  match,
  new strategies.StaleWhileRevalidate()
);

registerRoute(
  match,
  new strategies.NetworkFirst()
);

registerRoute(
  match,
  new strategies.CacheFirst()
);

registerRoute(
  match,
  new strategies.NetworkOnly()
);

registerRoute(
  match,
  new strategies.CacheOnly()
);

import {cacheNames} from 'workbox-core';

const precacheCacheName = cacheNames.precache;
const runtimeCacheName = cacheNames.runtime;
const googleAnalyticsCacheName = cacheNames.googleAnalytics;

// Force production builds
workbox.setConfig({ debug: false });

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});

import {* as navigationPreload} from 'workbox-navigation-preload';
import {registerRoute, NavigationRoute} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';

const CACHE_NAME = 'offline-html';
// This assumes /offline.html is a URL for your self-contained
// (no external images or styles) offline page.
const FALLBACK_HTML_URL = '/offline.html';
// Populate the cache with the offline HTML page when the
// service worker is installed.
self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.add(FALLBACK_HTML_URL))
  );
});

navigationPreload.enable();

const networkOnly = new NetworkOnly();
const navigationHandler = async (params) => {
  try {
    // Attempt a network request.
    return await networkOnly.handle(params);
  } catch (error) {
    // If it fails, return the cached HTML.
    return caches.match(FALLBACK_HTML_URL, {
      cacheName: CACHE_NAME,
    });
  }
};

// Register this strategy to handle all navigations.
registerRoute(
  new NavigationRoute(navigationHandler)
);

const FILES_TO_CACHE = [
  '/',
  'index.html',
  'src/app.js',
  'src/FileSaver.js',
  'manifest.json.js',
  'src/style.css',
  'src/emojiPicker.js',
];