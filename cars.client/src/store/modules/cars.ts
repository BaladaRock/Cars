// store/cars.ts
import axios from '../../axiosConfig';
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
  selectedCar: Car | null;
}

const state: State = {
  cars: [],
  selectedCar: null,
};

const getters = {
  allCars: (state: State) => state.cars,
  selectedCar: (state: State) => state.selectedCar,
};

const actions = {
  async addCar({ commit }: ActionContext<State, any>, car: Car) {
    try {
      const response = await axios.post<Car>('/api/cars', car);
      commit('newCar', response.data);
    } catch (error) {
      console.error('Error adding car:', error);
    }
  },
  async fetchCar({ commit }: ActionContext<State, any>, serialNumber: string) {
    try {
      const response = await axios.get<Car>(`/api/cars/${serialNumber}`);
      commit('setCar', response.data);
    } catch (error) {
      console.error('Error fetching car:', error);
    }
  },
  async fetchCars({ commit }: ActionContext<State, any>) {
    try {
      const response = await axios.get<Car[]>('/api/cars');
      commit('setCars', response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
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
  async updateCar({ commit, dispatch }: ActionContext<State, any>, payload: { car: Car; serialNumberToUpdate: string }) {
    try {
        const { car, serialNumberToUpdate } = payload;

        await axios.put(`/api/cars/${serialNumberToUpdate}`, car);
        await dispatch('fetchCars');
        commit('newCar', car);
    } catch (error) {
        console.error('Error updating car:', error);
    }
},
};

const mutations = {
  setCar: (state: State, car: Car) => {
    state.selectedCar = car;
  },
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