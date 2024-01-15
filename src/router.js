import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './pages/HomeView.vue';
import Favorites from './pages/Favorites.vue';
import LoginView from './pages/LoginView.vue';
import { authGuard } from '../src/auth/routeGuards'; // Import the authGuard function



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
    meta: { requiresAuth: true },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Apply the authGuard to all route changes
router.beforeEach(authGuard);


export default router;
