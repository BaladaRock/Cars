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
  
      // Watch for changes in the `car` prop and update `editedCar`
      watch(() => props.car, (newCar) => {
        editedCar.value = { ...newCar };
      }, { immediate: true });
  
      const updateCarDetails = async () => {
        await store.dispatch('updateCar', editedCar.value);
        // Optionally, you could navigate back to the car list or show a success message here
      };
  
      return {
        editedCar,
        updateCarDetails
      };
    }
  });
  </script>