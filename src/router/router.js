import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Page from "@/views/Page.vue";
import List from "@/components/List.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/page",
    name: "Page",
    component: Page,
    children:[
      {
        path: '/list',
        component: List,
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;