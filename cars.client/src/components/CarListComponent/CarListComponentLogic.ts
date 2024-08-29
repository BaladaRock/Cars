import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Car from '@/components/CarComponent/CarComponent.vue';

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