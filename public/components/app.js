// src/components/app.js

var app = {
  template: `
    <div class="container mx-auto p-4">
      <h1>Sellin' propane and propane accessories I tell you whut</h1>
    </div>
  `
};

var update = {
  data: function () {
    return {
      display: 'unset'
    }
  },
  template: `
    <div id="update" style="display: none;">
      Updates available: <button class="btn">Apply</button> <button class="btn">Dismiss</button>
    </div>
  `
};

export default {
  template: `
    <div class="container mx-auto p-4">
      <h1>Sellin' propane and propane accessories I tell you whut</h1>
    </div>
  `
};
