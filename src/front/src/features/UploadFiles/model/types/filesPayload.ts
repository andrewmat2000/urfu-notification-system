export type FilesPayload = {
    files: File;
};

export type UploadFilesPayloadElement = {
    fetchFunc: (payload: FilesPayload) => void;
    file: File | null;
};

export type UploadFilesPayload = {
    upload_students_general_info?: UploadFilesPayloadElement;
    upload_owed_students?: UploadFilesPayloadElement;
    upload_word_template?: UploadFilesPayloadElement;
};
