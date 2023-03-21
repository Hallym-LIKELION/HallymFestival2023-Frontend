import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import AOS from 'aos';
import "aos/dist/aos.css";

import './assets/main.css';

const app = createApp(App);

app.use(router);

app.mount('#app');

new Vue({
  created() {
      AOS.init();
  },
el: '#app',
router,
render: h => h(App)
})