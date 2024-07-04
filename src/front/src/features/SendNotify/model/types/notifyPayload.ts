export type NotifyPayload = {
    login: string;
    password: string;
    messageTitle: string;
    messageText?: string;
    files: File[];
};
