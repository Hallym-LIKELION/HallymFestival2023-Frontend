import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/timetable',
      name: 'timetable',
      component: () => import('../views/TimeTableView.vue')
    },
    {
      path: '/program',
      name: 'program',
      component: () => import('../views/ProgramListView.vue')
    }
  ]
})

export default router
