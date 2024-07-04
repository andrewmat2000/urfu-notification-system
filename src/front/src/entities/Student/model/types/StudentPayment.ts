import type { StudentListItem } from "$entities/Student";

export type StudentPayment = {
    id: string;
    student: StudentListItem;
    expectedPay: number;
    amountOfDebt: number;
    logTime: string;
};
