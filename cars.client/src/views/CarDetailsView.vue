<template>
  <div v-if="selectedCar">
    <h2>Car Details</h2>
    <p>Brand: {{ selectedCar.brand }}</p>
    <p>Model: {{ selectedCar.model }}</p>
    <p>Year: {{ selectedCar.modelYear }}</p>
    <p>Fuel: {{ selectedCar.fuel }}</p>
    <p>Color: {{ selectedCar.color }}</p>
    <p>Serial Number: {{ selectedCar.serialNumber }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const serialNumber = route.params.serialNumber;

    onMounted(() => {
      if (serialNumber) {
        store.dispatch('fetchCar', serialNumber);
        // Check right after fetching
        const car = store.state.selectedCar;
        console.log('On mounted test:', car); // Check after dispatch
      } else {
        console.error('Serial number is undefined');
      }
    });

    const selectedCar = computed(() => store.getters.selectedCar);

    // Watch selectedCar, to make sure any change in the state of 'selectedCar' is captured as soon as it occurs
    watch(selectedCar, (newValue) => {
      console.log('selectedCar updated:', newValue);
    });

    return {
      selectedCar,
    };
  },
});
</script>