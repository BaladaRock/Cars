import { computed, Ref, ref } from "vue";
import { useStore } from "vuex";
import {
    getFilteredColors,
    getFilteredFuelTypes,
    getFilteredModels,
    getFilteredYears
} from "@/helpers/carFilterHelper";
import { Car } from "@/components/CarComponent.vue";

export function useCarFilters(car: Ref<Car>) {
    const store = useStore();

    const allModels = computed(() => store.getters.allModels);
    const uniqueBrands = computed(() => store.getters.uniqueBrands);

    const filteredModels = ref<string[]>([]);
    const filteredYears = ref<number[]>([]);
    const filteredFuels = ref<string[]>([]);
    const filteredColors = ref<string[]>([]);

    const filterModels = () => {
        filteredModels.value = getFilteredModels(allModels.value, car.value.brand);
        car.value.model = '';
        filteredYears.value = [];
        car.value.modelYear = null as any;
        filteredFuels.value = [];
        car.value.fuel = '';
        filteredColors.value = [];
        car.value.color = '';
    };

    const filterYears = () => {
        filteredYears.value = getFilteredYears(allModels.value, car.value.brand, car.value.model);
        car.value.modelYear = null as any;
        filteredFuels.value = [];
        car.value.fuel = '';
        filteredColors.value = [];
        car.value.color = '';
    };

    const filterFuelTypes = () => {
        filteredFuels.value = getFilteredFuelTypes(
            allModels.value,
            car.value.brand,
            car.value.model,
            car.value.modelYear
        );
        car.value.fuel = '';
        filteredColors.value = [];
        car.value.color = '';
    };

    const filterColors = () => {
        filteredColors.value = getFilteredColors(
            allModels.value,
            car.value.brand,
            car.value.model,
            car.value.modelYear,
            car.value.fuel
        );
        car.value.color = '';
    };

    return {
        uniqueBrands,
        filteredModels,
        filteredYears,
        filteredFuels,
        filteredColors,
        filterModels,
        filterYears,
        filterFuelTypes,
        filterColors,
    };
}