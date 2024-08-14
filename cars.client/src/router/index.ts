import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CarDetailsView from '@/views/CarDetailsView.vue';
import NewCarComponent from '@/components/NewCarComponent.vue'; 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/cars/:serialNumber',
    name: 'car-detail',
    component: CarDetailsView,
    props: true
  },
  {
    path: '/cars/newCar',
    name: 'new-car',
    component: NewCarComponent,
    props: true
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;