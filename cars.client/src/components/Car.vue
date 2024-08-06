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