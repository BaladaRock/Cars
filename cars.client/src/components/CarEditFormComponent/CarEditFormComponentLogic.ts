import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Car } from '@/components/CarComponent/CarComponent.vue';
import { redirectBasedOnSerialNumber } from '@/helpers/carAccessHelper';
import { useCarFilters } from '@/mixins/carFilterMixin';

export default defineComponent({
    props: {
        car: {
            type: Object as () => Car,
            required: true,
        },
    },
    setup(props, { emit }) {
        const store = useStore();

        const editedCar = ref<Car>({ ...props.car });
        const originalSerialNumber = ref(props.car.serialNumber);
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
        } = useCarFilters(editedCar);

        onMounted(async () => {
            await store.dispatch('fetchModels');
            filterModels();
        });

        const updateCarDetails = async () => {
            try {
                const urlSerialNumber = originalSerialNumber.value;

                const response = await store.dispatch('updateCar', {
                    car: { ...editedCar.value },
                    serialNumberToUpdate: urlSerialNumber,
                });

                if (response && response.status === 200) {
                    emit('update-succes');
                    alert('Car details updated successfully!');

                    originalSerialNumber.value !== editedCar.value.serialNumber
                        ? redirectBasedOnSerialNumber(editedCar.value.serialNumber)
                        : originalSerialNumber.value = editedCar.value.serialNumber;
                }
            } catch (error) {
                alert('An error occurred while updating car details.');
            }
        };

        return {
            editedCar,
            uniqueBrands,
            filteredModels,
            filteredYears,
            filteredFuels,
            filteredColors,
            filterModels,
            filterYears,
            filterFuelTypes,
            filterColors,
            updateCarDetails,
        };
    },
});