module.exports = [{
  urlPattern: new RegExp('/\.(?:png|gif|jpg|jpeg|webp|svg)$/'),
  handler: 'CacheFirst',
  options: {
    cacheableResponse: {
      statuses: [0, 200, 201],
    },
    cacheName: 'app-cache',
    expiration: {
      maxEntries: 5,
      maxAgeSeconds: 60 * 60 * 24 * 365,
    },
  },
}, {
  urlPattern: new RegExp('^https://www.youtube.com/'),
  handler: 'CacheFirst',
  options: {
    cacheableResponse: {
      statuses: [0, 200, 201],
    },
    cacheName: 'app-cache',
    expiration: {
      maxEntries: 5,
      maxAgeSeconds: 60 * 60 * 24,
    },
  },
}];
