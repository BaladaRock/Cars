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
    const response = await axios.get<Car[]>('/cars');
    commit('setCars', response.data);
  },
  async addCar({ commit }: ActionContext<State, any>, car: Car) {
    const response = await axios.post<Car>('/cars', car);
    commit('newCar', response.data);
  },
  async deleteCar({ commit }: ActionContext<State, any>, serialNumber: string) {
    await axios.delete(`/cars/${serialNumber}`);
    commit('removeCar', serialNumber);
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