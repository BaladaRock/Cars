<template>
  <div>
    <p>{{ car.brand }} - {{ car.model }} ({{ car.modelYear }}) - {{ car.fuel }} - {{ car.color }}</p>
    <button @click="deleteCar(car.serialNumber)">Delete</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Car {
  brand: string;
  modelYear: number;
  model: string;
  fuel: string;
  color: string;
  serialNumber: string;
}

export default defineComponent({
  name: 'CarComponent',
  props: {
    car: {
      type: Object as PropType<Car>,
      required: true,
    },
  },
  methods: {
    deleteCar(serialNumber: string) {
      this.$emit('delete-car', serialNumber);
    },
  },
});
</script>
  
  <style scoped>
  .car-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .car-card p {
    margin: 8px 0;
  }
  
  .car-card button {
    background-color: #ff4d4f;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .car-card button:hover {
    background-color: #e60023;
  }
  </style>