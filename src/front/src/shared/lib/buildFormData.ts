//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildFormData = (data: any, formData = new FormData(), parentKey = "") => {
    if (
        data &&
        typeof data === "object" &&
        !(data instanceof Date) &&
        !(data instanceof File) &&
        !(data instanceof Blob)
    ) {
        Object.keys(data).forEach(key => {
            buildFormData(data[key], formData, parentKey ? `${parentKey}[${key}]` : key);
        });
    } else if (data !== undefined) {
        const value = data == null ? "" : data;
        formData.append(parentKey, value);
    }

    return formData;
};
