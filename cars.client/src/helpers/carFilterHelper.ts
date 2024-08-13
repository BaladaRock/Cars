import { Car } from '@/components/CarComponent.vue';

export const getFilteredProperty = <K extends keyof Car>(
    cars: Car[],
    filters: Partial<Car>,
    property: K
): Car[K][] => {
    return [
        ...new Set(
            cars
                .filter((car) =>
                    Object.keys(filters).every(
                        (key) => car[key as keyof Car] === filters[key as keyof Car]
                    )
                )
                .map((car) => car[property])
        ),
    ];
};

export const getFilteredModels = (
    cars: Car[],
    brand: string
): string[] => {
    return getFilteredProperty(cars, { brand }, "model");
};

export const getFilteredYears = (
    cars: Car[],
    brand: string,
    model: string
): number[] => {
    return getFilteredProperty(cars, { brand, model }, "modelYear");
};

export const getFilteredFuelTypes = (
    cars: Car[],
    brand: string,
    model: string,
    year: number
): string[] => {
    return getFilteredProperty(cars, { brand, model, modelYear: year }, "fuel");
};

export const getFilteredColors = (
    cars: Car[],
    brand: string,
    model: string,
    year: number,
    fuel: string
): string[] => {
    return getFilteredProperty(cars, { brand, model, modelYear: year, fuel }, "color");
};
