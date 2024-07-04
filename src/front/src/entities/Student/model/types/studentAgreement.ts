import type { StudentListItem } from "./studentListItem";
import type { StudentPayer } from "./studentPayer";
import type { StudentPayment } from "./StudentPayment";

export type StudentAgreement = {
    id: string;
    number: string;
    student: StudentListItem;
    isSelfPay: boolean;
    payer: StudentPayer | null;
    paymentHistory: StudentPayment[];
};
