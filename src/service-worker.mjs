import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { CacheFirst } from 'workbox-strategies';
import { cleanupOutdatedCaches, matchPrecache, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
import { strategy as streamsStrategy } from 'workbox-streams';

import partials from './lib/partials.mjs';
import routeMatchers from './lib/route-matchers.mjs';

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

registerRoute(
    routeMatchers.get('index'),
    streamsStrategy([
        () => matchPrecache(partials.header),
        () => matchPrecache(partials.footer),
    ]),
);

registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'other-images',
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({
                maxEntries: 10,
                purgeOnQuotaError: true,
            }),
        ],
    }),
);

self.skipWaiting();
clientsClaim();

// pbsInitialize();
