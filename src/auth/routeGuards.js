import store from '../store';

export const authGuard = (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login if authentication is required but not present
  } else {
    next(); // Continue with navigation
  }
};