import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/Home.vue'
// 404 a mettre
export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  },
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/speeches',
      component: () => import('@/Speeches.vue'),
      props: true,
    },
    {
      path: '/babel-tower',
      component: () => import('@/BabelTower.vue'),
    },
    {
      path: '/babel-tower/game',
      component: () => import('@/BabelTowerGame.vue'),
    },
    {
      path: '/guestbook',
      component: () => import('@/Guestbook.vue'),
    },
    {
      path: '/information',
      component: () => import('@/Information.vue'),
    },
    // and finally the default route, when none of the above matches:
    {
      path: "/:pathMatch(.*)*",
      component: () => import('@/404.vue'),
    },
  ],
})
