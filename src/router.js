import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './pages/HomeView.vue';
import Favorites from './pages/Favorites.vue';
import LoginView from './pages/LoginView.vue';


const routes = [
  {
    path: '/',
    redirect: '/login', // Redirect from the root path to the login page
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
