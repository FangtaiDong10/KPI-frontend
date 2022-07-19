import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/home',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          name: 'home',
          path: '/home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          name: 'courses',
          path: '/courses',
          component: () => import('@/views/CoursesView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    }
  ],
});

export default router;
