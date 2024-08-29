import { defineComponent, onMounted, watch, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import CarEditForm from '@/components/CarEditFormComponent/CarEditFormComponent.vue';
import ensureString from '@/helpers/carSerialNumberHelper';
import computeCarImageSource from '@/helpers/carImageHelper';

export default defineComponent({
    components: {
        CarEditForm,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const serialNumber = ref(route.params.serialNumber);
        const defaultImageSource = '/src/assets/images/car.jpeg';

        const fetchCarData = async (serialNumber: string) => {
            if (serialNumber) {
                await store.dispatch('fetchCar', serialNumber);
            }
        };

        onMounted(() => {
            if (!serialNumber.value) {
                return;
            }

            fetchCarData(ensureString(serialNumber.value));
        });

        watch(
            () => route.params.serialNumber,
            (newSerialNumber) => {
                fetchCarData(ensureString(newSerialNumber));
            }
        );

        const selectedCar = computed(() => store.getters.selectedCar);

        const carImageSource = computed(() => {
            if (selectedCar.value) {
                return computeCarImageSource(selectedCar.value);
            }
            return defaultImageSource;
        });

        const goBack = () => {
            router.push({ name: 'home' });
        };

        const handleImageError = (event: Event) => {
            const imgElement = event.target as HTMLImageElement;
            imgElement.src = defaultImageSource;
        };

        return {
            selectedCar,
            goBack,
            carImageSource,
            handleImageError,
        };
    },
});