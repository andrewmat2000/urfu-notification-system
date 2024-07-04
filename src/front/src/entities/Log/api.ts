import { baseRtkApi } from "$shared/api";
import { buildApiSelectors } from "$shared/lib";

import type { Log } from "./model";

const logsApi = baseRtkApi.injectEndpoints({
    endpoints: build => ({
        getLogsList: build.query<Log[], null>({
            query: () => ({
                url: "/logs/get_list",
            }),
            transformResponse: (response: Log[]) => response.filter(log => Boolean(log.id) && Boolean(log.userId)),
        }),
        getLogsListByUserId: build.query<Log[], string>({
            query: userId => ({
                url: `/logs/get_list/${userId}`,
            }),
            transformResponse: (response: Log[]) => response.filter(log => Boolean(log.id) && Boolean(log.userId)),
        }),

        getLogById: build.query<Log[], string>({
            query: logId => ({
                url: `/logs/${logId}`,
            }),
            transformResponse: (response: Log[]) => response.filter(log => Boolean(log.id) && Boolean(log.userId)),
        }),
    }),
});

export const useLogList = logsApi.useGetLogsListQuery;
export const useLogListByUserId = logsApi.useGetLogsListByUserIdQuery;
export const useGetLogById = logsApi.useGetLogByIdQuery;

export const logsSelectors = buildApiSelectors(logsApi.endpoints);
