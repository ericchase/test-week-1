// src/main.js
import App from "./components/app.js";

new Vue({
  render: h => h(App)
}).$mount(`#app`);

// register the service-worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function (response) {
    console.log('[Service Worker] Registration Success', response);
  }).catch(function (error) {
    console.log('[Service Worker] Registration Failed:', error);
  });
};
