// src/main.js
import app from "./components/app.js";

// Mount the app module.
var vm = new Vue({
  render: h => h(app)
}).$mount(`#app`);

// Request app refresh.
function promptUserToUpdate(worker) {
  // this is just an example
  // don't use window.confirm in real life; it's terrible
  if (worker !== null) {
    console.log('[Service Worker] Prompt for Update', worker);

    // new Vue({
    //   el: '#update',
    //   data: {
    //     display: 'unset',
    //     accept: function () { worker.postMessage('skipWaiting'); }
    //   },
    //   template: `
    //     <div id="update">
    //       Updates available: <button class="btn">Apply</button> <button class="btn">Dismiss</button>
    //     </div>
    //   `
    // });
  }
}

// Register the service-worker.
var refresh = false;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function (registration) {
      console.log('[Service Worker] Registration Success', registration);

      if (registration === null) {
        return;
      }

      // Prompt user if new service worker is installing.
      registration.addEventListener('updatefound', function (e) {
        console.log('[Service Worker] Updates', registration);

        if (registration.active !== null) {
          if (registration.installing || registration.waiting) {
            console.log('[Service Worker] Worker Waiting', registration);
            promptUserToUpdate(registration.installing || registration.waiting);
            return;
          }
        }
      });
    })
    .catch(function (error) {
      console.log('[Service Worker] Registration Failed:', error);
    });

  // Reload page when new service worker takes over.
  navigator.serviceWorker.addEventListener('controllerchange',
    function (e) {
      console.log('[Service Worker] Controller Change');
      if (!refresh) {
        refresh = true;
        window.location.reload();
      }
    })
};
