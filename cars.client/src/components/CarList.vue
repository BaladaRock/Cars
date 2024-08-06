<template>
    <div>
      <h2>Cars</h2>
      <div v-for="car in allCars" :key="car.serialNumber">
        <Car :car="car" @delete-car="deleteCar" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import Car from './CarComponent.vue';
  
  export default defineComponent({
    components: {
      Car,
    },
    computed: {
      ...mapGetters(['allCars']),
    },
    methods: {
      ...mapActions(['fetchCars', 'deleteCar']),
    },
    created() {
      this.fetchCars();
    },
  });
  </script>
  
  <style scoped>
  /* Specific styling */
  </style>