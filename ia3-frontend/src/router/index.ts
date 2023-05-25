import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Events from "../views/Events.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/events",
    component: Events,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
