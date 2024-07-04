export type StudentListItem = {
    id: string;
    numberOfAgreement: string;
    firstName: string;
    lastName: string;
    surname: string;
    phoneNumber: string;
    email: string;
    amountOfDebt: number;
    group: {
        id: string;
        name: string;
        program: {
            id: string;
            name: string;
        };
    };
    institute: {
        id: string;
        name: string;
    };
};
