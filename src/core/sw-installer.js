export const registerSW = _ => {
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker not supported - aborting');
        return;
    }

    navigator.serviceWorker.register('/sw.js').then(registration => {
        if (registration.active) {
            registration.active.postMessage('version');
        }

        registration.onupdatefound = function () {
            console.log('A new version has been found... Installing...');
            registration.installing.onstatechange = function () {
                if (this.state === 'installed') {
                    return console.log('App updated');
                }

                if (this.state === 'activated') {
                    registration.active.postMessage('version');
                    return console.log('activated');
                }

                console.log('Incoming SW state:', this.state);
            };
        }
    });
}