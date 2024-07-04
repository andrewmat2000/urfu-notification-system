import type { ValueOf } from "$models";

import { AppRoutes } from "./appRoutes";

export const RoutePath: Record<ValueOf<typeof AppRoutes>, string> = {
    [AppRoutes.BASE]: "/",

    [AppRoutes.STUDENTS]: "/students",
    [AppRoutes.STUDENT_AGREEMENT]: "/students/:studentId/agreement",
    [AppRoutes.STUDENTS_UPLOAD_DATA]: "/upload_data",

    [AppRoutes.NOTIFY_SEND]: "/notify/send",
    // [AppRoutes.NOTIFY_RESULT]: "/notify/result",

    [AppRoutes.ADMIN_USERS]: "/admin/users",
    [AppRoutes.ADMIN_LOGS]: "/admin/logs",

    [AppRoutes.NOT_FOUND]: "*",
} as const;
