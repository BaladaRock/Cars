<template>
  <div class="car_details_edit_wrapper">
    <div class="car_details" v-if="selectedCar">
      <h2>Car Details</h2>
      <p>Brand: {{ selectedCar.brand }}</p>
      <p>Model: {{ selectedCar.model }}</p>
      <p>Year: {{ selectedCar.modelYear }}</p>
      <p>Fuel: {{ selectedCar.fuel }}</p>
      <p>Color: {{ selectedCar.color }}</p>
      <p>Serial Number: {{ selectedCar.serialNumber }}</p>

      <button @click="goBack">Back to Home</button>
    </div>
    <div class="car_edit_form_wrapper" v-if="selectedCar">
      <CarEditForm :car="selectedCar" @update-success="goBack" :key="selectedCar.serialNumber" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
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
    CarEditForm,
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
.car_details_edit_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 100%;
  margin: auto;
  padding: 1rem;
  box-sizing: border-box;
  gap: 2rem;
}

.car_details {
  flex: 1 1 45%;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.car_edit_form_wrapper {
  flex: 1 1 45%;
}

@media (max-width: 768px) {
  .car_details_edit_wrapper {
    flex-direction: column;
  }

  .car_details,
  .car_edit_form_wrapper {
    flex: 1 1 100%;
    padding: 0.5rem;
  }
}
</style>
