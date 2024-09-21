import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css'
import store from "./store"
import App from './App.vue'

let app = createApp(App)
const router = createRouter({
history: createWebHashHistory(),
routes: routes,
})
app.use(store)
app.use(router).use(PrimeVue);
app.mount("#app")