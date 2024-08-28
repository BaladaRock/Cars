import { Model } from '@/store/modules/models';

export const getFilteredProperty = <K extends keyof Model>(
    models: Model[] = [],
    filters: Partial<Model>,
    property: K
): Model[K][] => {
    if (!models || models.length === 0) {
        return [];
    }

    return [
        ...new Set(
            models
                .filter((model) =>
                    Object.keys(filters).every(
                        (key) => model[key as keyof Model] === filters[key as keyof Model]
                    )
                )
                .map((model) => model[property])
        ),
    ];
};

export const getFilteredModels = (models: Model[], brand: string): string[] => {
    return getFilteredProperty(models, { brand }, "model");
};

export const getFilteredYears = (models: Model[], brand: string, model: string): number[] => {
    return getFilteredProperty(models, { brand, model }, "modelYear");
};

export const getFilteredFuelTypes = (models: Model[], brand: string, model: string, year: number): string[] => {
    return getFilteredProperty(models, { brand, model, modelYear: year }, "fuel");
};

export const getFilteredColors = (models: Model[], brand: string, model: string, year: number, fuel: string): string[] => {
    return getFilteredProperty(models, { brand, model, modelYear: year, fuel }, "color");
};
