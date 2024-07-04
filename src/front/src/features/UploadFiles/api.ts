import { baseRtkApi } from "$shared/api";
import { buildApiSelectors, buildFormData } from "$shared/lib";

import type { FilesPayload, FilesResponse } from "./model";

export const uploadFilesApi = baseRtkApi.injectEndpoints({
    endpoints: build => ({
        uploadGeneralStudentInfoList: build.mutation<FilesResponse, FilesPayload>({
            query: payload => ({
                url: "/files/upload_students_general_info",
                method: "POST",
                body: buildFormData(payload),
            }),
        }),

        uploadOwedStudentInfoList: build.mutation<FilesResponse, FilesPayload>({
            query: payload => ({
                url: "/files/upload_owed_students",
                method: "POST",
                body: buildFormData(payload),
            }),
        }),

        uploadWordTemplate: build.mutation<FilesResponse, FilesPayload>({
            query: payload => ({
                url: "/files/upload_word_template",
                method: "POST",
                body: buildFormData(payload),
            }),
        }),
    }),
});

export const useUploadGeneralStudentInfoList = uploadFilesApi.useUploadGeneralStudentInfoListMutation;
export const useUploadOwedStudentInfoList = uploadFilesApi.useUploadOwedStudentInfoListMutation;
export const useUploadWordTemplate = uploadFilesApi.useUploadWordTemplateMutation;

export const uploadFilesSelectors = buildApiSelectors(uploadFilesApi.endpoints);
