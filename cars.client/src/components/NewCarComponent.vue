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

        <div class="btn_back_container">
            <button class="back_button save-button" type="submit">Save Changes</button>
        </div>
        <div class="btn_back_container">
            <button class="back_button" @click="goBack">Back to Home</button>
        </div>
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

        const goBack = () => {
            router.push({ name: 'home' });
        };

        return {
            newCar,
            createNewCar,
            goBack
        };
    },
});
</script>

<style scoped>
@import "@/assets/styles/components/NewCarComponent.css";
</style>
