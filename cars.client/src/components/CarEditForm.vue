<template>
    <form @submit.prevent="updateCarDetails">
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
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    props: {
        car: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const store = useStore();
        const editedCar = ref({ ...props.car });

        // Need to store the old serial number, in case the end user wants to update it via the form
        const originalSerialNumber = ref(props.car.serialNumber);

        // Watch for changes in the `car` prop and update `editedCar`
        watch(() => props.car, (newCar) => {
            editedCar.value = { ...newCar };
            originalSerialNumber.value = newCar.serialNumber;
        }, { immediate: true });

        const updateCarDetails = async () => {
            try {
                let urlSerialNumber = editedCar.value.serialNumber;
                if (originalSerialNumber.value !== editedCar.value.serialNumber) {
                    urlSerialNumber = originalSerialNumber.value;
                }

                await store.dispatch('updateCar', { car: { ...editedCar.value }, serialNumberToUpdate: urlSerialNumber });
                alert('Car details updated successfully!');
            } catch (error) {
                alert('An error occurred while updating car details.');
            }
        };

        return {
            editedCar,
            updateCarDetails
        };
    }
});
</script>