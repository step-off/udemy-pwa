self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('static')
            .then(function(cache) {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/src/js/app.js',
                    '/src/js/feed.js',
                    '/src/js/material.min.js',
                    '/src/css/app.css',
                    '/src/css/feed.css',
                    '/src/images/main-image-lg.jpg',
                    '/src/images/main-image-sm.jpg',
                    '/src/images/main-image.jpg',
                    '/src/images/sf-boat.jpg',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
                ])
            })
    )
});

self.addEventListener('activate', function(e) {
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    var request = e.request;

    e.respondWith(
        caches.match(request)
            .then(function(response) {
                if (response) {
                    return response;
                } else {
                    return fetch(request);
                }
            })
    )    
});
