import { defineComponent, PropType } from 'vue';
import DeleteButton from '@/components/DeleteButtonComponent/DeleteButtonComponent.vue';
import { useCarImage } from '@/helpers/carImageHelper';

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
    const { carImageSource, handleImageError } = useCarImage(props.car);

    return {
      carImageSource,
      handleImageError,
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