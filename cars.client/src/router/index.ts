import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CarDetailsView from '../views/CarDetailsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/api/cars/:serialNumber',
    name: 'car-detail',
    component: CarDetailsView,
    props: true
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;