import { Car } from "@/components/CarComponent.vue";
import { computed } from "vue";

export default function computeCarImageSource(car: Car) {
    const sourceRoot = '/src/assets/images/';
    return sourceRoot.concat(`${car.brand}/${car.brand}_${car.model}_${car.modelYear}_${car.color}.jpg`)
        .toLowerCase();
}

export function useCarImage(car: Car) {
    const defaultImageSource = '/src/assets/images/car.jpeg';
  
    const carImageSource = computed(() => {
      if (car) {
        return computeCarImageSource(car);
      }
      return defaultImageSource;
    });
  
    const handleImageError = (event: Event) => {
      const imgElement = event.target as HTMLImageElement;
      imgElement.src = defaultImageSource;
    };
  
    return {
      carImageSource,
      handleImageError,
    };
  }
