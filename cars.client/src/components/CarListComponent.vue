<template>
  <div>
    <h2>Cars</h2>

    <div class="car_list_component_wrapper">

      <div class="cars_container">
        <div class="car_container" v-for="car in allCars" :key="car.serialNumber">
          <Car :car="car" @delete-car="handleDeleteCar" />
        </div>
      </div>

      <div class="btn_create_container">
        <button class="save_button" type="button" @click="addCar()">
          Create a new car
        </button>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Car from '@/components/CarComponent.vue';

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
      this.$router.push({ name: 'car-detail', params: { serialNumber } });
    },

    addCar() {
      this.$router.push({ name: 'new-car' });
    },

    handleDeleteCar(serialNumber: string) {
      this.deleteCar(serialNumber)
        .then(() => {
          alert('Car deleted successfully!');
        })
        .catch((error) => {
          console.error('Error deleting car:', error);
          alert('An error occurred while deleting the car.');
        });
    },

  },
  created() {
    this.fetchCars();
  },
});
</script>

<style scoped>
@import "@/assets/styles/components/CarListComponent.css";
</style>