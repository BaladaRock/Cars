<template>
  <div v-if="selectedCar">
    <h2>Car Details</h2>
    <p>Brand: {{ selectedCar.brand }}</p>
    <p>Model: {{ selectedCar.model }}</p>
    <p>Year: {{ selectedCar.modelYear }}</p>
    <p>Fuel: {{ selectedCar.fuel }}</p>
    <p>Color: {{ selectedCar.color }}</p>
    <p>Serial Number: {{ selectedCar.serialNumber }}</p>

    <button @click="goBack">Back to Home</button>
    <CarEditForm :car="selectedCar" @update-success="goBack" :key="selectedCar.serialNumber"/>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import CarEditForm from '@/components/CarEditForm.vue';
import ensureString from '@/helpers/carHelpers';

export default defineComponent({
  components: {
    CarEditForm
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const serialNumber = ref(route.params.serialNumber);

    const fetchCarData = async (serialNumber: string) => {
      if (serialNumber) {
        await store.dispatch('fetchCar', serialNumber);
      }
    };

    onMounted(() => {
      if (!serialNumber.value) {
        return;
      }
      
      fetchCarData(ensureString(serialNumber.value));
    });

    watch(
      () => route.params.serialNumber,
      (newSerialNumber) => {
        fetchCarData(ensureString(newSerialNumber));
      }
    );
    

    const selectedCar = computed(() => store.getters.selectedCar);

    const goBack = () => {
      router.push({ name: 'home' });
    };

    return {
      selectedCar,
      goBack,
    };
  },
});
</script>

<style scoped>
button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>