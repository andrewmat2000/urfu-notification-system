import { BaseQueryMeta, BaseQueryResult } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { baseRtkApi } from "$shared/api";
import { buildApiSelectors } from "$shared/lib";

import { notifyPayloadBodyAdapter } from "./adapters";
import type { NotifyPayload, NotifyResponse } from "./model";

export const notifyApi = baseRtkApi.injectEndpoints({
    endpoints: build => ({
        sendNotifyAll: build.mutation<NotifyResponse, NotifyPayload>({
            query: payload => ({
                url: "/notify/send_all",
                method: "POST",
                body: notifyPayloadBodyAdapter(payload),
            }),
        }),
    }),
});

export const useSendNotifyAll = notifyApi.useSendNotifyAllMutation;

export const notifySelectors = buildApiSelectors(notifyApi.endpoints);
