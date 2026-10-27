import type { Router } from 'vue-router';
import { useUserStore } from '../stores/userStore';

export function setupGuards(router: Router): void {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    
    // Проверяем, требует ли маршрут авторизации (через meta)
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = userStore.isAuthenticated;

    if (requiresAuth && !isAuthenticated) {
      // Если не авторизован, кидаем на логин
      next('/login');
    } else if (to.path === '/login' && isAuthenticated) {
      // Если уже авторизован, нечего делать на странице логина
      next('/');
    } else {
      next();
    }
  });
}
