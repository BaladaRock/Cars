import { createStore } from 'vuex';
import cars from './modules/cars';

const store = createStore({
  modules: {
    cars,
  },
});

export default store;