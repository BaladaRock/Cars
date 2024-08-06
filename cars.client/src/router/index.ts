import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CarList from '../components/CarList.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: HomeView },
  { path: '/cars', component: CarList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;