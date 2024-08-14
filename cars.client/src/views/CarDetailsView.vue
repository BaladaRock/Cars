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

      <div class="car-image-container">
        <img
          class="car-image"
          :src="carImageSource"
          :alt="`Image of ${selectedCar.brand} ${selectedCar.model}`"
          @error="handleImageError"
        />
      </div>

      <div class="btn_back_container">
        <button class="back_button" @click="goBack">Back to Home</button>
      </div>
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
import ensureString from '@/helpers/carSerialNumberHelper';
import computeCarImageSource from '@/helpers/carImageHelper';

export default defineComponent({
  components: {
    CarEditForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const serialNumber = ref(route.params.serialNumber);
    const defaultImageSource = '/src/assets/images/car.jpeg';

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

    const carImageSource = computed(() => {
      if (selectedCar.value) {
        return computeCarImageSource(selectedCar.value);
      }
      return defaultImageSource;
    });

    const goBack = () => {
      router.push({ name: 'home' });
    };

    const handleImageError = (event: Event) => {
      const imgElement = event.target as HTMLImageElement;
      imgElement.src = defaultImageSource;
    };

    return {
      selectedCar,
      goBack,
      carImageSource,
      handleImageError,
    };
  },
});
</script>


<style scoped>
@import "@/assets/styles/views/CarDetailsView.css";
</style>
