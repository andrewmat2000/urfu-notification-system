import { baseRtkApi } from "$shared/api";
import { buildApiSelectors } from "$shared/lib";

import { type User } from "./model";

const userApi = baseRtkApi.injectEndpoints({
    endpoints: build => ({
        getUserList: build.query<User[], null>({
            query: () => ({
                url: "/users/get_list",
            }),
        }),
    }),
});

export const useUserList = userApi.useGetUserListQuery;

export const userSelectors = buildApiSelectors(userApi.endpoints);
