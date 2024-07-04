export enum ReceiverError {
    StudentNotFound,
    AgreementNumberNotFound,
}

export type NotifyResponseItem = {
    documentNumber: number;
    documentPage: number;
    receiver: {
        fullName: string;
        email: string;
    };
};

export type NotifyResponse = {
    messagesSended: NotifyResponseItem[];
    pagesError: (NotifyResponseItem & {
        receiverError: ReceiverError;
    })[];
};
