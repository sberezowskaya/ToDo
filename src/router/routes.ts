import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // Авторизационные страницы
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { 
        path: '', 
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: { breadcrumb: 'Вход' }
      }
    ]
  },
  
  // Защищенные страницы (MainLayout)
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true }, // Защищаем всё внутри этого лэйаута
    children: [
      { 
        path: '', 
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: { breadcrumb: 'Главная' }
      },
      { 
        path: 'settings', 
        name: 'settings',
        component: () => import('pages/SettingsPage.vue'),
        meta: { breadcrumb: 'Настройки' }
      }
    ]
  },

  // 404
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('pages/NotFoundPage.vue'),
  },
];

export default routes;
