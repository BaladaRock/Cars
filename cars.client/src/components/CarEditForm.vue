<template>
    <form @submit.prevent="updateCarDetails" class="car_edit_form">
        <div>
            <label for="viewCar_brand">Brand:</label>
            <select id="viewCar_brand" v-model="editedCar.brand" @change="filterModels">
                <option value="" disabled>Select a brand</option>
                <option v-for="brand in uniqueBrands" :key="brand" :value="brand">
                    {{ brand }}
                </option>
            </select>
        </div>

        <div>
            <label for="viewCar_model">Model:</label>
            <select id="viewCar_model" v-model="editedCar.model" @change="filterYears">
                <option value="" disabled>Select a model</option>
                <option v-for="model in filteredModels" :key="model" :value="model">
                    {{ model }}
                </option>
            </select>
        </div>

        <div>
            <label for="viewCar_modelYear">Year:</label>
            <select id="viewCar_modelYear" v-model="editedCar.modelYear" @change="filterFuelTypes">
                <option value="" disabled>Select a year</option>
                <option v-for="year in filteredYears" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
        </div>

        <div>
            <label for="viewCar_fuel">Fuel:</label>
            <select id="viewCar_fuel" v-model="editedCar.fuel" @change="filterColors">
                <option value="" disabled>Select a fuel type</option>
                <option v-for="fuel in filteredFuels" :key="fuel" :value="fuel">
                    {{ fuel }}
                </option>
            </select>
        </div>

        <div>
            <label for="viewCar_color">Color:</label>
            <select id="viewCar_color" v-model="editedCar.color">
                <option value="" disabled>Select a color</option>
                <option v-for="color in filteredColors" :key="color" :value="color">
                    {{ color }}
                </option>
            </select>
        </div>

        <div>
            <label for="viewCar_serialNumber">Serial Number:</label>
            <input id="viewCar_serialNumber" v-model="editedCar.serialNumber" />
        </div>

        <button type="submit">Save Changes</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Car } from '@/components/CarComponent.vue';
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
</script>

<style scoped>
@import "@/assets/styles/components/CarEditForm.css";
</style>
