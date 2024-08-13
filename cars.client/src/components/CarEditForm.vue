<!-- <template>
    <form @submit.prevent="updateCarDetails" class="car_edit_form">
        <div>
            <label for="brand">Brand:</label>
            <input id="brand" v-model="editedCar.brand" />
        </div>
        <div>
            <label for="model">Model:</label>
            <input id="model" v-model="editedCar.model" />
        </div>
        <div>
            <label for="modelYear">Year:</label>
            <input id="modelYear" v-model="editedCar.modelYear" type="number" />
        </div>
        <div>
            <label for="fuel">Fuel:</label>
            <input id="fuel" v-model="editedCar.fuel" />
        </div>
        <div>
            <label for="color">Color:</label>
            <input id="color" v-model="editedCar.color" />
        </div>
        <div>
            <label for="serialNumber">Serial Number:</label>
            <input id="serialNumber" v-model="editedCar.serialNumber" />
        </div>
        <button type="submit">Save Changes</button>
    </form>
</template>

<script lang="ts">
import axios from '@/axiosConfig';
import router from '@/router';
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    props: {
        car: {
            type: Object,
            required: true,
        },
    },
    setup(props, { emit }) {
        const store = useStore();
        const editedCar = ref({ ...props.car });

        const originalSerialNumber = ref(props.car.serialNumber);

        watch(
            () => props.car,
            (newCar) => {
                editedCar.value = { ...newCar };
                originalSerialNumber.value = newCar.serialNumber;
            },
            { immediate: true }
        );

        const updateCarDetails = async () => {
            try {
                const urlSerialNumber = originalSerialNumber.value;

                const response = await store.dispatch('updateCar', {
                    car: { ...editedCar.value },
                    serialNumberToUpdate: urlSerialNumber,
                });

                if (response.status === 200) {
                    if (originalSerialNumber.value !== editedCar.value.serialNumber) {
                        emit('update-succes');
                        alert('Car details updated successfully!');
                        router.push({
                            name: 'car-detail',
                            params: { serialNumber: editedCar.value.serialNumber },
                        });
                    } else {
                        emit('update-succes');
                        alert('Car details updated successfully!');

                        originalSerialNumber.value = editedCar.value.serialNumber;
                    }
                }
            } catch (error) {
                const alertMessage =
                    axios.isAxiosError(error) && error.response?.status === 409
                        ? 'Serial number already exists. Please choose a different one.'
                        : 'An error occurred while updating car details.';
                alert(alertMessage);
            }
        };

        return {
            editedCar,
            updateCarDetails,
        };
    },
});
</script>

<style scoped>
@import "@/assets/styles/components/CarEditForm.css";
</style> -->

<template>
    <form @submit.prevent="updateCarDetails" class="car_edit_form">
        <div>
            <label for="brand">Brand:</label>
            <select id="brand" v-model="editedCar.brand" @change="filterModels">
                <option v-for="brand in uniqueBrands" :key="brand" :value="brand">
                    {{ brand }}
                </option>
            </select>
        </div>

        <div>
            <label for="model">Model:</label>
            <select id="model" v-model="editedCar.model" @change="filterYears">
                <option v-for="model in filteredModels" :key="model" :value="model">
                    {{ model }}
                </option>
            </select>
        </div>

        <div>
            <label for="modelYear">Year:</label>
            <select id="modelYear" v-model="editedCar.modelYear" @change="filterFuelTypes">
                <option v-for="year in filteredYears" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
        </div>

        <div>
            <label for="fuel">Fuel:</label>
            <select id="fuel" v-model="editedCar.fuel" @change="filterColors">
                <option v-for="fuel in filteredFuels" :key="fuel" :value="fuel">
                    {{ fuel }}
                </option>
            </select>
        </div>

        <div>
            <label for="color">Color:</label>
            <select id="color" v-model="editedCar.color">
                <option v-for="color in filteredColors" :key="color" :value="color">
                    {{ color }}
                </option>
            </select>
        </div>

        <!-- Serial Number remains an input from the end user -->
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
import {
    handleError,
    redirectBasedOnSerialNumber
} from '@/helpers/carLogsHelper';

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

        const allCars = computed<Car[]>(() => store.getters.allCars);

        const uniqueBrands = computed<string[]>(() => {
            return [...new Set(allCars.value.map(car => car.brand))];
        });

        const filteredModels = ref<string[]>([]);
        const filteredYears = ref<number[]>([]);
        const filteredFuels = ref<string[]>([]);
        const filteredColors = ref<string[]>([]);

        const filterModels = () => {
            filteredModels.value = getFilteredModels(allCars.value, editedCar.value.brand);
            editedCar.value.model = '';
            filteredYears.value = [];
            editedCar.value.modelYear = null as any;
            filteredFuels.value = [];
            editedCar.value.fuel = '';
            filteredColors.value = [];
            editedCar.value.color = '';
        };

        const filterYears = () => {
            filteredYears.value = getFilteredYears(allCars.value, editedCar.value.brand, editedCar.value.model);
            editedCar.value.modelYear = null as any;
            filteredFuels.value = [];
            editedCar.value.fuel = '';
            filteredColors.value = [];
            editedCar.value.color = '';
        };

        const filterFuelTypes = () => {
            filteredFuels.value = getFilteredFuelTypes(
                allCars.value,
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
                allCars.value,
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
                handleError(error);
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
