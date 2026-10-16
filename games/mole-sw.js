// 玖球パニック(もぐら叩き)のPWA用サービスワーカー。
// 同じサイトのファイルはネットワーク優先(つながらない・遅いときはキャッシュ)、
// Google Fontsはキャッシュ優先。ファイルを追加・改名したら CACHE_VERSION を上げる。
var CACHE_VERSION = 'mole-v1';

var PRECACHE = [
  'mole.html',
  'mole-icon.js',
  '../style.css',
  'mole.png',
  'mole-green.png',
  'mole-red.png',
  'hole-top.png',
  'hole-bottom.png',
  'icons/mole-192.png',
  'icons/mole-512.png',
  'icons/mole-apple-touch.png'
];

// この時間内にネットワークから返ってこなければ、キャッシュがあればそれを使う
var NETWORK_TIMEOUT_MS = 3000;

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) { return cache.addAll(PRECACHE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) {
          return k.indexOf('mole-') === 0 && k !== CACHE_VERSION;
        }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

function networkFirst(request) {
  return caches.open(CACHE_VERSION).then(function (cache) {
    return cache.match(request, { ignoreSearch: true }).then(function (cached) {
      var network = fetch(request).then(function (res) {
        if (res && res.ok) cache.put(request, res.clone());
        return res;
      });
      if (!cached) return network;
      var timeout = new Promise(function (resolve) {
        setTimeout(function () { resolve(cached); }, NETWORK_TIMEOUT_MS);
      });
      return Promise.race([network.catch(function () { return cached; }), timeout]);
    });
  });
}

function cacheFirst(request) {
  return caches.open(CACHE_VERSION).then(function (cache) {
    return cache.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) cache.put(request, res.clone());
        return res;
      });
    });
  });
}

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(req));
  } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(req));
  }
});
