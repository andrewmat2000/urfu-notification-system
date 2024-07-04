import type { baseRtkApi } from "$shared/api";

export type StateSchema = {
    [baseRtkApi.reducerPath]: ReturnType<typeof baseRtkApi.reducer>;
};
