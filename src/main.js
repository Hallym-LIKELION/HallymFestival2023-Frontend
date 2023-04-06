import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { PaginationControl, PaginationPage } from 'vue-smart-pagination';

import 'aos/dist/aos.css';

import './assets/main.css';


Vue.component('PaginationControl', PaginationControl);
Vue.component('PaginationPage', PaginationPage);
const app = createApp(App);

app.use(router);

app.mount('#app');
