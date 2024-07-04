import type { FC } from "react";
import { classNames } from "shared/lib";

import type { StudentPayment } from "$entities/Student";

interface IPaymentRowProps {
    className?: string;
    paymentElement: StudentPayment;
}

export const PaymentRow: FC<IPaymentRowProps> = ({ className, paymentElement }) => {
    const date = new Date(paymentElement.logTime);

    return (
        <tr className={classNames(className)}>
            <td>{paymentElement.student.numberOfAgreement}</td>
            <td>{date.toLocaleDateString()}</td>
            <td>{paymentElement.amountOfDebt} руб.</td>
        </tr>
    );
};
