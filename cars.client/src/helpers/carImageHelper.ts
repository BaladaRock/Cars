import { Car } from "@/components/CarComponent.vue";


export default function computeCarImageSource(car: Car) {
    const sourceRoot = '/src/assets/images/';
    return sourceRoot.concat(`${car.brand}/${car.brand}_${car.model}_${car.modelYear}_${car.color}.jpg`)
        .toLowerCase();
}