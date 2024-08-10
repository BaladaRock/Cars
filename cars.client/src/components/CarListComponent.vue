<template>
  <div>
    <h2>Cars</h2>

    <div class="car_list_component_wrapper">

      <div class="cars_container">
        <div class="car_container" v-for="car in allCars" :key="car.serialNumber">
          <Car :car="car" @delete-car="deleteCar" />
          <button type="button" @click="viewCarDetails(car.serialNumber)">
            See car
          </button>
        </div>
      </div>

      <div class="btn_create_container">
        <button class="btn_create" type="button" @click="addCar()">
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
    }

  },
  created() {
    this.fetchCars();
  },
});
</script>

<style scoped>
.car_list_component_wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 100%;
  margin: auto;
  flex-wrap: wrap;

  .cars_container {
    flex: 1 1 50%;
    padding-right: 1rem;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .btn_create_container {
    flex: 1 1 25%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding-top: 1rem;
    box-sizing: border-box;
  }

  .btn_create {
    color: white;
    background-color: red;
    height: 3rem;
    width: 100%;
    font-size: larger;
    max-width: 200px;
  }

  @media (max-width: 768px) {

    .cars_container,
    .btn_create_container {
      flex: 1 1 100%;
      padding-right: 0;
    }

    .btn_create {
      width: 100%;
    }
  }
}
</style>