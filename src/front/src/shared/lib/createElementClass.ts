export const createElementClass = (baseClass: string, variant: string, type?: string) => {
    return [baseClass, variant, type].filter(Boolean).join("-");
};
