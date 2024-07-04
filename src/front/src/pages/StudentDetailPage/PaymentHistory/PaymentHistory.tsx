import type { FC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib";

import { studentSelectors } from "$entities/Student";
import { type Header, Table, Text } from "$ui";

import { PaymentRow } from "./PaymentRow";

import s from "./PaymentHistory.module.scss";

interface IPaymentHistoryProps {
    className?: string;
}

const headers: Header[] = [{ title: "Номер договора" }, { title: "Дата оплаты" }, { title: "Сумма долга" }];

export const PaymentHistory: FC<IPaymentHistoryProps> = ({ className }) => {
    const { studentId = "" } = useParams();
    const { data } = useSelector(studentSelectors.getAgreementByStudentId(studentId));

    if (!data) {
        return null;
    }

    return (
        <div className={classNames(className)}>
            <Text
                color={"blue_main"}
                size={"lg"}
                fontWeight={"bold"}
            >
                История платежей
            </Text>
            <Table
                className={s.table}
                headers={headers}
                borderRadius={0}
            >
                {data.paymentHistory.map(payment => (
                    <PaymentRow
                        key={payment.id}
                        paymentElement={payment}
                    />
                ))}
            </Table>
        </div>
    );
};
