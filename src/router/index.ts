import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Task from '../views/Task.vue';
import RouteNames from '@/router/constants.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/task/:id',
      name: RouteNames.TASK_INFORMATION,
      component: Task,
    },
  ],
})

export default router
