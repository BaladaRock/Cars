<template>
  <div class="car-card">
    <p>{{ car.brand }} - {{ car.model }} ({{ car.modelYear }}) - {{ car.fuel }} - {{ car.color }}</p>

    <div class="car-image-container">
      <img class="car-image" :src="carImageSource" alt="car-image">
    </div>
    
    <div class="car-actions">
      <button class="see-car-button" @click="viewCarDetails">See car</button>
      <DeleteButton :serialNumber="car.serialNumber" @delete-car="handleDelete" />
    </div>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import DeleteButton from '@/components/DeleteButtonComponent.vue';
import computeCarImageSource from '@/helpers/carImageHelper';

export interface Car {
  brand: string;
  modelYear: number;
  model: string;
  fuel: string;
  color: string;
  serialNumber: string;
}

export default defineComponent({
  name: 'CarComponent',
  components: {
    DeleteButton,
  },
  props: {
    car: {
      type: Object as PropType<Car>,
      required: true,
    },
  },
  setup(props) {
    const carImageSource = computed(() => computeCarImageSource(props.car));

    return {
      carImageSource,
    };
  },
  methods: {
    viewCarDetails() {
      this.$router.push({ name: 'car-detail', params: { serialNumber: this.car.serialNumber } });
    },
    handleDelete(serialNumber: string) {
      this.$emit('delete-car', serialNumber);
    },
  },
});
</script>

<style scoped>
@import "@/assets/styles/components/CarComponent.css";
</style>
