import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Navigation guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
  
    // Check if the route requires authentication
    if (to.meta.requiresAuth && !isAuthenticated) {
      // Redirect to the login page
      next({ name: 'login' });
    } else {
      // Continue to the requested route
      next();
    }
  });

createApp(App).use(store).use(router).mount('#app')
