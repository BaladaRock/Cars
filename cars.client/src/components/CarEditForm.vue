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
.car_edit_form {
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

.car_edit_form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.car_edit_form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.car_edit_form button {
    padding: 10px;
    background-color: #4caf50;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
}

.car_edit_form button:hover {
    background-color: #45a049;
}
</style>