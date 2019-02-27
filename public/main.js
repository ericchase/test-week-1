// src/main.js
import App from "./components/app.js";

new Vue({
  render: h => h(App)
}).$mount(`#app`);

// register the service-worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
};