import type {
    ApiEndpointMutation,
    ApiEndpointQuery,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition,
    QueryDefinition,
} from "@reduxjs/toolkit/query";

type BaseQueryFnDefault = BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    Record<string, unknown>,
    FetchBaseQueryMeta
>;

type EndpointQueryDefault = ApiEndpointQuery<QueryDefinition<any, BaseQueryFnDefault, never, any, "api">, any>;
type EndpointMutationDefault = ApiEndpointMutation<MutationDefinition<any, BaseQueryFnDefault, never, any, "api">, any>;

type ApiEndpoint = EndpointQueryDefault | EndpointMutationDefault;

export const buildApiSelectors = <T extends Record<string, ApiEndpoint>>(endPoints: T) => {
    const endpointsKeys = Object.keys(endPoints);
    return Object.fromEntries(endpointsKeys.map((endpoint: keyof T) => [endpoint, endPoints[endpoint].select])) as {
        [key in keyof T]: T[key]["select"];
    };
};
