import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import store from "./store";
import components from "./components/index.js";
createApp(App)
    .use(router)
    .use(store)
    .use(components)
    .mount('#app')
