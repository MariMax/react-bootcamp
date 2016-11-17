(function(){
                  if (!('serviceWorker' in navigator)) {
                console.log('Service Worker not supported - aborting');
                return;
              }

                navigator.serviceWorker.register('/sw.js').then(function (registration) {

    // We should also start tracking for any updates to the Service Worker.
    registration.onupdatefound = function () {
      console.log('A new version has been found... Installing...');

      // If an update is found the spec says that there is a new Service Worker
      // installing, so we should wait for that to complete then show a
      // notification to the user.
      registration.installing.onstatechange = function () {
        if (this.state === 'installed') {
          return console.log('App updated');
        }

        if (this.state === 'activated') {
          return console.log('activated');
        }

        console.log('Incoming SW state:', this.state);
      };
    }
  });
}());