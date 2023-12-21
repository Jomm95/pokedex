import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/myHome.vue';
import Favorites from './pages/favoritesList.vue';

const routes = [
  {
    path: '/',
    name: 'myHome',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'favoritesList',
    component: Favorites,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
