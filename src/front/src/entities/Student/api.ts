import { baseRtkApi } from "$shared/api";
import { buildApiSelectors } from "$shared/lib";

import type { StudentAgreement, StudentListItem } from "./model";

const studentApi = baseRtkApi.injectEndpoints({
    endpoints: build => ({
        getStudentList: build.query<StudentListItem[], null>({
            query: () => ({
                url: "/students/get_list",
            }),
            transformResponse: (response: StudentListItem[]) => response.filter(student => Boolean(student.id)),
        }),
        getAgreementByStudentId: build.query<StudentAgreement, string>({
            query: (studentId: string) => ({
                url: "/agreements/get_by_student_id",
                params: {
                    studentId,
                },
            }),
        }),
    }),
});

export const useStudentList = studentApi.useGetStudentListQuery;
export const useStudentAgreement = studentApi.useGetAgreementByStudentIdQuery;
export const studentSelectors = buildApiSelectors(studentApi.endpoints);
