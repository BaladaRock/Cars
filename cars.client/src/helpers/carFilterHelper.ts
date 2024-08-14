import { Car } from '@/components/CarComponent.vue';

export const getFilteredProperty = <K extends keyof Car>(
    initialCars: Car[],
    filters: Partial<Car>,
    property: K
): Car[K][] => {
    return [
        ...new Set(
            initialCars
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
    initialCars: Car[],
    brand: string
): string[] => {
    return getFilteredProperty(initialCars, { brand }, "model");
};

export const getFilteredYears = (
    initialCars: Car[],
    brand: string,
    model: string
): number[] => {
    return getFilteredProperty(initialCars, { brand, model }, "modelYear");
};

export const getFilteredFuelTypes = (
    initialCars: Car[],
    brand: string,
    model: string,
    year: number
): string[] => {
    return getFilteredProperty(initialCars, { brand, model, modelYear: year }, "fuel");
};

export const getFilteredColors = (
    initialCars: Car[],
    brand: string,
    model: string,
    year: number,
    fuel: string
): string[] => {
    return getFilteredProperty(initialCars, { brand, model, modelYear: year, fuel }, "color");
};
