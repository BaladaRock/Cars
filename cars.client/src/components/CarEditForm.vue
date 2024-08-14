<template>
    <form @submit.prevent="updateCarDetails" class="car_edit_form">
        <div>
            <label for="brand">Brand:</label>
            <select id="brand" v-model="editedCar.brand" @change="filterModels">
                <option value="" disabled>Select a brand</option>
                <option v-for="brand in uniqueBrands" :key="brand" :value="brand">
                    {{ brand }}
                </option>
            </select>
        </div>

        <div>
            <label for="model">Model:</label>
            <select id="model" v-model="editedCar.model" @change="filterYears">
                <option value="" disabled>Select a model</option>
                <option v-for="model in filteredModels" :key="model" :value="model">
                    {{ model }}
                </option>
            </select>
        </div>

        <div>
            <label for="modelYear">Year:</label>
            <select id="modelYear" v-model="editedCar.modelYear" @change="filterFuelTypes">
                <option value="" disabled>Select a year</option>
                <option v-for="year in filteredYears" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
        </div>

        <div>
            <label for="fuel">Fuel:</label>
            <select id="fuel" v-model="editedCar.fuel" @change="filterColors">
                <option value="" disabled>Select a fuel type</option>
                <option v-for="fuel in filteredFuels" :key="fuel" :value="fuel">
                    {{ fuel }}
                </option>
            </select>
        </div>

        <div>
            <label for="color">Color:</label>
            <select id="color" v-model="editedCar.color">
                <option value="" disabled>Select a color</option>
                <option v-for="color in filteredColors" :key="color" :value="color">
                    {{ color }}
                </option>
            </select>
        </div>

        <div>
            <label for="serialNumber">Serial Number:</label>
            <input id="serialNumber" v-model="editedCar.serialNumber" />
        </div>

        <button type="submit">Save Changes</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { Car } from '@/components/CarComponent.vue';
import {
    getFilteredModels,
    getFilteredYears,
    getFilteredFuelTypes,
    getFilteredColors,
} from '@/helpers/carFilterHelper';
import { redirectBasedOnSerialNumber } from '@/helpers/carAccessHelper';

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

        const initialCars = computed<Car[]>(() => store.getters.initialCars); // Folosim initialCars

        const uniqueBrands = computed<string[]>(() => {
            return [...new Set(initialCars.value.map(car => car.brand))];
        });

        const filteredModels = ref<string[]>([]);
        const filteredYears = ref<number[]>([]);
        const filteredFuels = ref<string[]>([]);
        const filteredColors = ref<string[]>([]);

        const filterModels = () => {
            filteredModels.value = getFilteredModels(initialCars.value, editedCar.value.brand);
            editedCar.value.model = '';
            filteredYears.value = [];
            editedCar.value.modelYear = null as any;
            filteredFuels.value = [];
            editedCar.value.fuel = '';
            filteredColors.value = [];
            editedCar.value.color = '';
        };

        const filterYears = () => {
            filteredYears.value = getFilteredYears(initialCars.value, editedCar.value.brand, editedCar.value.model);
            editedCar.value.modelYear = null as any;
            filteredFuels.value = [];
            editedCar.value.fuel = '';
            filteredColors.value = [];
            editedCar.value.color = '';
        };

        const filterFuelTypes = () => {
            filteredFuels.value = getFilteredFuelTypes(
                initialCars.value,
                editedCar.value.brand,
                editedCar.value.model,
                editedCar.value.modelYear
            );
            editedCar.value.fuel = '';
            filteredColors.value = [];
            editedCar.value.color = '';
        };

        const filterColors = () => {
            filteredColors.value = getFilteredColors(
                initialCars.value,
                editedCar.value.brand,
                editedCar.value.model,
                editedCar.value.modelYear,
                editedCar.value.fuel
            );
            editedCar.value.color = '';
        };

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
                    if (originalSerialNumber.value !== editedCar.value.serialNumber) {
                        redirectBasedOnSerialNumber(editedCar.value.serialNumber);
                    } else {
                        originalSerialNumber.value = editedCar.value.serialNumber;
                    }
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
