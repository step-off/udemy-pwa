;(function() {

registerServiceWorker();

function registerServiceWorker() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/serviceWorker.js')
            .then(function() {
                console.log('Service worker successfully registered')
            });
    }
}
})();