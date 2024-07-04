import type { FC } from "react";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { studentSelectors } from "$entities/Student";
import { DownloadNotifyButton } from "$features/DownloadNotificationTemplate";
import { notifyEndpoints } from "$shared/api";
import { AppRoutes, RoutePath } from "$shared/routes";
import { Button } from "$ui";

import s from "./HeaderActions.module.scss";

export const HeaderActions: FC = memo(() => {
    const { pathname } = useLocation();
    const { studentId } = useParams();
    const navigate = useNavigate();
    const isAdminPanel = pathname.includes("admin");
    const text = isAdminPanel ? "Выйти из админки" : "Войти в админку";
    const { isLoading, data, error } = useSelector(studentSelectors.getAgreementByStudentId(studentId || ""));
    const url = data
        ? `${notifyEndpoints.GET_WITH_AGREEMENT}?agreementNumber=${data.student.numberOfAgreement}`
        : `${notifyEndpoints.GET_ALL}`;

    const handleUploadDataClick = useCallback(() => {
        navigate(AppRoutes.STUDENTS_UPLOAD_DATA);
    }, []);

    const clickAdminButtonHandler = useCallback(() => {
        if (isAdminPanel) {
            navigate(AppRoutes.STUDENTS);
        } else {
            navigate(AppRoutes.ADMIN_USERS);
        }
    }, [isAdminPanel]);

    return (
        <div className={s.actions}>
            <DownloadNotifyButton
                url={url}
                disabled={isLoading || Boolean(error)}
            />
            <Button onClick={handleUploadDataClick}>Обновить данные</Button>
            <Button onClick={clickAdminButtonHandler}>{text}</Button>
            <Link to={RoutePath.notify_send}>
                <Button>Отправить</Button>
            </Link>
        </div>
    );
});
