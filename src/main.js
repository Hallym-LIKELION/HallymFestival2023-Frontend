import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueAwesomePaginate from 'vue-awesome-paginate';
import Toast from 'vue-toastification';

// 축제 공용 CSS import
import './assets/main.css';

import 'vue3-carousel/dist/carousel.css'; // Carousel 패키지 CSS
import 'vue-awesome-paginate/dist/style.css'; // Pagenation 패키지 CSS
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(router); // Vue Router
app.use(VueAwesomePaginate); // Vue Pagenation
app.use(Toast, {
  toastClassName: 'toast',
  containerClassName: 'toast',
  transition: 'Vue-Toastification__bounce',
  maxToasts: 1,
  newestOnTop: true,
  position: 'bottom-center',
  icon: false,
  draggable: false,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  timeout: 2500
});

app.mount('#app');
