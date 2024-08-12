<template>
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
</style>