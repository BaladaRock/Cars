import axios from 'axios';
import { ActionContext } from 'vuex';

interface Car {
  brand: string;
  modelYear: number;
  model: string;
  fuel: string;
  color: string;
  serialNumber: string;
}

interface State {
  cars: Car[];
}

const state: State = {
  cars: [],
};

const getters = {
  allCars: (state: State) => state.cars,
};

const actions = {
    async fetchCars({ commit }: ActionContext<State, any>) {
      console.log('Axios baseURL in fetchCars:', axios.defaults.baseURL);
      try {
        const response = await axios.get<Car[]>('/api/cars');
        commit('setCars', response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    },
    async addCar({ commit }: ActionContext<State, any>, car: Car) {
      try {
        const response = await axios.post<Car>('/api/cars', car);
        commit('newCar', response.data);
      } catch (error) {
        console.error('Error adding car:', error);
      }
    },
    async deleteCar({ commit }: ActionContext<State, any>, serialNumber: string) {
      try {
        await axios.delete(`/api/cars/${serialNumber}`);
        commit('removeCar', serialNumber);
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    },
  };
  

const mutations = {
  setCars: (state: State, cars: Car[]) => (state.cars = cars),
  newCar: (state: State, car: Car) => state.cars.push(car),
  removeCar: (state: State, serialNumber: string) => (state.cars = state.cars.filter((car) => car.serialNumber !== serialNumber)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};