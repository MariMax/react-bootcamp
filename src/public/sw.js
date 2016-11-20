importScripts('/cache-manifest.js?__addHash');

const NAME = 'react-bootcamp';
let VERSION = '{{__version}}';
if (VERSION==='{{__version}}'){
  VERSION = 'max300'+(new Date()).valueOf();
}

self.oninstall = evt => {
  // const urls = cacheManifest.map(url => {
    // return new Request(url, { credentials: 'include' });
  // });

  evt.waitUntil(
    caches
      .open(NAME + '-v' + VERSION)
      .then(cache => cache.addAll(cacheManifest))
  );

  self.skipWaiting();
};

self.onactivate = _ => {
  const currentCacheName = NAME + '-v' + VERSION;
  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName.indexOf(NAME) === -1) {
          return null;
        }

        if (cacheName !== currentCacheName) {
          return caches.delete(cacheName);
        }

        return null;
      })
    );
  });

  self.clients.claim();
}

self.onfetch = evt => {
  const cacheName = NAME + '-v' + VERSION;
  if (evt.request.url.includes('browser-sync') ||
    evt.request.url.includes('webpack') || 
    (evt.request.url.replace(self.location.origin, '') === '/' && VERSION.includes('max'))) {
    return evt.respondWith(fetch(evt.request));
  }

  return evt.respondWith(
    caches.match(evt.request, { cacheName })
      .then(response => {
        if (response) {
          return response;
        }

        const request = evt.request;
        return fetch(request).then(fetchResponse => {
          return caches.open(NAME + '-v' + VERSION).then(cache => {
            return cache.put(request.clone(), fetchResponse.clone());
          }).then(_ => {
            return fetchResponse;
          });
        }, err => {
          console.warn(`Unable to fetch ${evt.request.url}.`);
          console.warn(err.stack);
          return new Response('Unable to fetch.');
        });
      })
  );
};