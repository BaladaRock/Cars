import { createStore } from 'vuex';
import cars from '@/store/modules/cars';
import models from './modules/models';

const store = createStore({
  modules: {
    cars,
    models,
  },
});

export default store;