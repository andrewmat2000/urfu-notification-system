import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "$shared/constants";

export const baseRtkApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: headers => {
            const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY) || "";
            if (token) {
                headers.set("Authorization", token);
            }
            return headers;
        },
    }),
    endpoints: builder => ({}),
});
