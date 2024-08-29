import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CarDetailsComponent from '@/components/CarDetailsComponent/CarDetailsComponent.vue';
import NewCarComponent from '@/components/NewCarComponent/NewCarComponent.vue'; 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/cars/:serialNumber',
    name: 'car-detail',
    component: CarDetailsComponent,
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