# test-week-1

First 2 are small guides. Next 4 are the things we need to make the App work.  
https://medium.freecodecamp.org/progressive-web-apps-102-building-a-progressive-web-app-from-scratch-397b72168040  
https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0  
    https://developer.mozilla.org/en-US/docs/Web/Manifest  
    https://tomitm.github.io/appmanifest/  
    https://serviceworke.rs/  
    https://medium.com/@aleemuddin13/how-to-host-static-website-on-firebase-hosting-for-free-9de8917bebf2  



Setting up Vue.js App without Webpack
https://markus.oberlehner.net/blog/goodbye-webpack-building-vue-applications-without-webpack/

start npm project
    create `package.json` file

set up a web server
    run `npm install --save-dev browser-sync`
    give it a few minutes to install
    run `npm audit fix`
    there is 1 vulnerability, but it'll probably be ok

add 'start' script to package.json
    `"start": "browser-sync start --server 'src' --files 'src' --single"`
    test it in terminal
    it work

create basic directory and file structure
    .
    ├── package.json
    └── src
        ├── components
        ├── index.html
        └── main.js

add base html code to index.html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>Hello World!</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
        <!-- This is a development version of Vue.js! -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script src="/main.js" type="module"></script>
    </head>
    <body>
        <div id="app"></div>
    </body>
    </html>

add some javascript code to main.js
    // src/main.js
    import App from './components/App.js';

    new Vue({
    render: h => h(App),
    }).$mount(`#app`);

add the App component in App.js
    // src/components/App.js
    export default {
    name: 'App',
    template: `
        <div class="container mx-auto p-4">
        <h1>Hello World</h1>
        </div>
    `,
    };

add meta tags to index.html
add icons
use web app manifest generator to create a manifest file

create new project to firebase
add firebase to local project
    https://firebase.google.com/docs/web/setup?authuser=0
install firebase-tools
    `npm install -g firebase-tools`
    `firebase init`    # Generate a firebase.json (REQUIRED)
    `firebase serve`   # Start development server
