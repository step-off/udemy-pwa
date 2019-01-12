importScripts('/src/js/idb.js');
importScripts('/src/js/idbHelper.js');
importScripts('/src/js/requestHelper.js');

var STATIC_FILES = [
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
];
var POSTS_URL = 'https://pwagram-8fd0d.firebaseio.com/posts.json';

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('static')
            .then(function(cache) {
	             cache.addAll(STATIC_FILES)
            })
    )
});

self.addEventListener('activate', function(e) {
    return self.clients.claim();
});

self.addEventListener('fetch', fetchEventHandler);
self.addEventListener('sync', handleSync)

function fetchEventHandler(event) {
    if (event.request.url.indexOf(POSTS_URL) > -1) {
    	handlePostsFetch(event);
    } else {
	    handleCommonFetch(event);
    }
}

function fetchRequest(request) {
    return fetch(request).then(function(response) {
        return storeInDynamicCache(request, response);
    });
}

function storeInDynamicCache(request, response) {
    return caches.open('dynamic').then(function(cache) {
        cache.put(request.url, response.clone());
        return response;            
    })
}

function handlePostsFetch(event) {
	event.respondWith(
		fetch(event.request).then(function (res) {
			var clonedRes = res.clone();

			IdbHelper.clearStore('posts')
				.then(function () {
					return clonedRes.json();
				})
				.then(function (data) {
					storeDataInDb(data);
			});

			return res;
		})
	)
}

function handleCommonFetch(event) {
	var request = event.request;

	event.respondWith(
		caches.match(request)
			.then(function(response) {
				if (response) {
					return response;
				} else {
					return fetchRequest(request);
				}
			})
	)
}

function storeDataInDb(dataObject) {
	for (const key in dataObject) {
		if (dataObject.hasOwnProperty(key)) {
			const element = dataObject[key];

			IdbHelper.writeData('posts', element);
		}
	}
}

function handleSync(event) {
	if (event.tag === 'sync-new-post') {
		event.waitUntil(
			IdbHelper.readData('sync-posts')
				.then(function(postsArray) {
					postsArray.forEach(function(post) {
						RequestHelper.postData(POSTS_URL, post).then(function(result) {
							if (result.ok) {
								IdbHelper.deleteItem('sync-posts', post.id);
							}
						})
					})
				})
		)
	}
}
