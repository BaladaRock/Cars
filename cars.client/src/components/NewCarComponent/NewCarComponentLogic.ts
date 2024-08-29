import router from '@/router';
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import {
    handleError,
    redirectBasedOnSerialNumber
} from '@/helpers/carAccessHelper';
import { useCarFilters } from '@/mixins/carFilterMixin';


export default defineComponent({
    name: 'NewCarComponent',
    setup() {
        const store = useStore();

        const newCar = ref({
            brand: '',
            modelYear: new Date().getFullYear(),
            model: '',
            fuel: '',
            color: '',
            serialNumber: '',
        });
        const {
            uniqueBrands,
            filteredModels,
            filteredYears,
            filteredFuels,
            filteredColors,
            filterModels,
            filterYears,
            filterFuelTypes,
            filterColors,
        } = useCarFilters(newCar);

        onMounted(async () => {
            await store.dispatch('fetchModels');
            filterModels();
        });

        const createNewCar = async () => {
            try {
                const response = await store.dispatch('addCar', newCar.value);
                if (response && response.status === 201) {
                    alert('Car created successfully!');
                }
                redirectBasedOnSerialNumber(newCar.value.serialNumber);
            } catch (error) {
                handleError(error);
            }
        };

        const goBack = () => {
            router.push({ name: 'home' });
        };

        return {
            newCar,
            uniqueBrands,
            filteredModels,
            filteredYears,
            filteredFuels,
            filteredColors,
            filterModels,
            filterYears,
            filterFuelTypes,
            filterColors,
            createNewCar,
            goBack
        };
    },
});