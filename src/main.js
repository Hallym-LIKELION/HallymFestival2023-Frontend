import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueAwesomePaginate from 'vue-awesome-paginate';

// 축제 공용 CSS import
import './assets/main.css';

import 'vue3-carousel/dist/carousel.css'; // Carousel 패키지 CSS
import 'vue-awesome-paginate/dist/style.css'; // Pagenation 패키지 CSS
import 'aos/dist/aos.css'; // AOS 패키지 CSS

const app = createApp(App);

app.use(router); // Vue Router
app.use(VueAwesomePaginate); // Vue Pagenation

app.mount('#app');
