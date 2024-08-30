import axios from '@/config/axiosConfig';
import { ActionContext } from 'vuex';

export interface Model {
    brand: string;
    modelYear: number;
    model: string;
    fuel: string;
    color: string;
}

interface State {
    models: Model[];
}

const state: State = {
    models: [],
};

const getters = {
    allModels: (state: State) => state.models,
    uniqueBrands: (state: State) =>
        [...new Set(state.models.map(model => model.brand))],
};

const actions = {
    async fetchModels({ commit }: ActionContext<State, any>) {
        if (state.models.length !== 0) {
            return;
        }
        try {
            const response = await axios.get<Model[]>('/api/models');
            commit('setModels', response.data);
        } catch (error) {
            console.error('Error fetching models:', error);
            return Promise.reject(error);
        }
    },
};

const mutations = {
    setModels: (state: State, models: Model[]) => state.models = models,
};

export default {
    state,
    getters,
    actions,
    mutations,
};
