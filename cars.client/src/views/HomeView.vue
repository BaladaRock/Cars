<template>
    <div>
      <CarList />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent as homeView } from 'vue';
  import CarList from '@/components/CarListComponent/CarListComponent.vue';
  
  export default homeView({
    components: {
      CarList,
    },
  });
  </script>
  
  <style scoped>
  /* Specific styling here */
  </style>