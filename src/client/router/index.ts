import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: {name: 'Home'}
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('@/components/Profile.vue'),
  },
  {
    path: '/player',
    name: 'Player',
    component: () => import('@/views/Player.vue'),
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/views/Team.vue'),
  },
  {
    path: '/keeplist',
    name: 'KeepList',
    component: () => import('@/views/KeepList.vue'),
  },
  {
    path: '/draft',
    name: 'Draft',
    component: () => import('@/views/Draft.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
