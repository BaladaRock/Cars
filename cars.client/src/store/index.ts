import { createStore } from 'vuex';
import cars from '@/store/modules/cars';

const store = createStore({
  modules: {
    cars,
  },
});

export default store;