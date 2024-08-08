<template>
  <div>
    <h2>Cars</h2>
    <div v-for="car in allCars" :key="car.serialNumber">
      <Car :car="car" @delete-car="deleteCar" />
      <button type="button" @click="viewCarDetails(car.serialNumber)">
        See car
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Car from './CarComponent.vue';

export default defineComponent({
  name: 'CarListComponent',
  components: {
    Car,
  },
  computed: {
    ...mapGetters(['allCars']),
  },
  methods: {
    ...mapActions(['fetchCars', 'deleteCar']),
    viewCarDetails(serialNumber: string) {
      console.log('test go to cardetails method', serialNumber);
      this.$router.push({ name: 'car-detail', params: { serialNumber } });
    }
  },
  created() {
    this.fetchCars();
  },
});
</script>

<style scoped>
/* Specific styling */
</style>