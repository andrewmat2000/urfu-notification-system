import type { NotifyPayload } from "./model";

export const notifyPayloadBodyAdapter = (payload: NotifyPayload) => {
    const result = new FormData();

    const { files, ...other } = payload;
    Object.keys(other).forEach(key => {
        const val = other[key as keyof typeof other];
        if (val) {
            result.append(key, val);
        }
    });

    files.forEach(file => {
        result.append("files", file);
    });

    return result;
};
