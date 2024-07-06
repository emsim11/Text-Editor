const { offlineFallback, warmStrategyCache } = require('workbox-recipes')
const { CacheFirst } = require('workbox-strategies')
const { registerRoute } = require('workbox-routing')
const { CacheableResponsePlugin } = require('workbox-cacheable-response')
const { ExpirationPlugin } = require('workbox-expiration')
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute')

precacheAndRoute(self.__WB_MANIFEST);

const PageCache = new CacheFirst({
    cacheName: 'Page-Cache',
    plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200],
        }),
        new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
    ],
});

warmStrategyCache({
    urls: ['/Index.html', '/'],
    strategy: PageCache,
});

registerRoute(({ Request }) => Request.mode === 'navigate', PageCache);

// Implement Asset Caching

registerRoute(
    ({ Request }) => ['script', 'style', 'worker'].includes(Request.destination),
    new StaleWhileRevalidate({
        cacheName: 'Asset-Cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
);