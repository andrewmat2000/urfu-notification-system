import type { RouteProps } from "react-router-dom";
import { Navigate } from "react-router-dom";

import type { ValueOf } from "$models";
import {
    LogsPage,
    SendNotifyPage,
    StudentDetailPage,
    StudentListPage,
    // SuccessSendNotifyPage,
    UserListPage,
} from "$pages";
import { UploadDataPage } from "$pages/UploadDataPage/UploadDataPage";
import { AppRoutes, RoutePath } from "$shared/routes";

export const routeConfig: Record<ValueOf<typeof AppRoutes>, RouteProps> = {
    [AppRoutes.STUDENTS]: {
        path: RoutePath.students,
        element: <StudentListPage />,
    },
    [AppRoutes.STUDENT_AGREEMENT]: {
        path: RoutePath.student_agreement,
        element: <StudentDetailPage />,
    },
    [AppRoutes.STUDENTS_UPLOAD_DATA]: {
        path: RoutePath.upload_data,
        element: <UploadDataPage />,
    },

    [AppRoutes.NOTIFY_SEND]: {
        path: RoutePath.notify_send,
        element: <SendNotifyPage />,
    },
    // [AppRoutes.NOTIFY_RESULT]: {
    //     path: RoutePath.notify_result,
    //     element: <SuccessSendNotifyPage />,
    // },

    [AppRoutes.ADMIN_USERS]: {
        path: RoutePath["admin/users"],
        element: <UserListPage />,
    },
    [AppRoutes.ADMIN_LOGS]: {
        path: RoutePath["admin/logs"],
        element: <LogsPage />,
    },

    [AppRoutes.BASE]: {
        path: RoutePath.base,
        element: <Navigate to={RoutePath.students} />,
    },

    [AppRoutes.NOT_FOUND]: {
        path: "*",
        element: <div>NOT FOUND</div>,
    },
} as const;
