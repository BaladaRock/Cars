<template>
    <form @submit.prevent="createNewCar" class="new_car_form">
        <div>
            <label for="brand">Brand:</label>
            <input id="brand" v-model="newCar.brand" />
        </div>
        <div>
            <label for="model">Model:</label>
            <input id="model" v-model="newCar.model" />
        </div>
        <div>
            <label for="modelYear">Year:</label>
            <input id="modelYear" v-model="newCar.modelYear" type="number" />
        </div>
        <div>
            <label for="fuel">Fuel:</label>
            <input id="fuel" v-model="newCar.fuel" />
        </div>
        <div>
            <label for="color">Color:</label>
            <input id="color" v-model="newCar.color" />
        </div>
        <div>
            <label for="serialNumber">Serial Number:</label>
            <input id="serialNumber" v-model="newCar.serialNumber" />
        </div>
        <button type="submit">Save Changes</button>
    </form>
</template>

<script lang="ts">
import axios from '@/axiosConfig';
import router from '@/router';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

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

        const createNewCar = async () => {
            try {
                const response = await store.dispatch('addCar', newCar.value);
                if (response && response.status === 201) {
                    alert('Car created successfully!');
                    router.push({
                        name: 'car-detail',
                        params: { serialNumber: newCar.value.serialNumber },
                    });
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
            newCar,
            createNewCar,
        };
    },
});
</script>

<style scoped>
.new_car_form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.new_car_form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.new_car_form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.new_car_form button {
    padding: 10px;
    background-color: #4caf50;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
}

.new_car_form button:hover {
    background-color: #45a049;
}
</style>