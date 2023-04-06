import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: () => import('../views/AnnouncementView.vue')
    },
    {
      path: '/boothmap',
      name: 'booth-map',
      component: () => import('../views/BoothMapView.vue')
    },
    {
      path: '/booth/:id',
      name: 'booth',
      component: () => import('../views/BoothView.vue')
    },
    {
      path: '/timetable',
      name: 'timetable',
      component: () => import('../views/TimeTableView.vue')
    },
    {
      path: '/program',
      name: 'program',
      component: () => import('../views/ProgramListView.vue')
    },
    {
      path: '/goods',
      name: 'goods',
      component: () => import('../views/Goods.vue')
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('../views/CommentView.vue')
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: () => import('../views/AboutUs.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 애니메이션 0.25s 기다린 후 스크롤 올리기
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 250);
    });
  }
});

export default router;
