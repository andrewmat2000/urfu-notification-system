import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { studentSelectors } from "$entities/Student";
import { RoutePath } from "$shared/routes";
import { Button, IconArrow } from "$ui";

import s from "./HeaderDetailActions.module.scss";

export const HeaderDetailActions = () => {
    const { studentId, userId } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { data } = useSelector(studentSelectors.getAgreementByStudentId(studentId || userId || ""));

    const handleGoBack = useCallback(() => navigate(-1), []);

    const isBackButtonEnabled =
        studentId || userId || pathname.includes(RoutePath.upload_data) || pathname.includes(RoutePath.notify_send);

    const backButtonText = isBackButtonEnabled ? "Назад" : "";
    const text = data ? `${data.student.lastName} ${data.student.firstName} ${data.student.surname}` : backButtonText;

    return (
        <div className={s.container}>
            {isBackButtonEnabled && (
                <Button
                    variant={"text"}
                    className={s.icon}
                    onClick={handleGoBack}
                >
                    <IconArrow direction={"left"} />
                </Button>
            )}
            <h3>{text}</h3>
        </div>
    );
};
