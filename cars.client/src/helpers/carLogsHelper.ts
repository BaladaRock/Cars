import router from '@/router';
import axios from 'axios';

export function handleError(error: unknown) {
    const alertMessage =
        axios.isAxiosError(error) && error.response?.status === 409
            ? 'Serial number already exists. Please choose a different one.'
            : 'An error occurred while updating car details.';
    alert(alertMessage);
}

export function redirectBasedOnSerialNumber(serialNumber: string) {
    router.push({
        name: 'car-detail',
        params: { serialNumber },
    });
}