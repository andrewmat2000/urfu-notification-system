import { useParams } from "react-router-dom";

import { useStudentAgreement } from "$entities/Student";
import { getDateDifferent } from "$shared/lib";
import { InfoText } from "$ui";

import { NotificationList } from "./NotificationList";
import { PaymentHistory } from "./PaymentHistory";

import s from "./StudentDetailPage.module.scss";

export const StudentDetailPage = () => {
    const { studentId } = useParams();
    const { isLoading, data, error } = useStudentAgreement(studentId || "");

    if (!data) {
        return null;
    }

    const payer = data.payer ?? data.student;
    const lastPayDate = data.paymentHistory.length > 0 ? new Date(data.paymentHistory[0]?.logTime) : null;
    const currentDate = new Date();
    const daysDelay = lastPayDate ? getDateDifferent(currentDate, lastPayDate, "days") : 0;

    return (
        <div className={s.detail}>
            <div className={s.main_info}>
                <InfoText
                    title={"Институт"}
                    value={data.student.institute.name}
                    size={"lg"}
                />
                <InfoText
                    title={"Группа"}
                    value={data.student.group.name}
                    size={"lg"}
                />
                <InfoText
                    title={"Номер договора"}
                    value={data.student.numberOfAgreement}
                    size={"lg"}
                />
                <InfoText
                    title={"Просрочка"}
                    //TODO: исправить
                    value={`${daysDelay} дней`}
                    size={"lg"}
                />
                <InfoText
                    title={"Плательщик"}
                    value={`${payer.firstName} ${payer.lastName}`}
                    size={"lg"}
                />
                <InfoText
                    title={"Номер телефона"}
                    value={data.student.phoneNumber}
                    size={"lg"}
                />
                <InfoText
                    title={"Почта"}
                    value={payer.email}
                    size={"lg"}
                />
                <PaymentHistory />
            </div>
            <NotificationList />
        </div>
    );
};
