import { call, takeEvery } from "redux-saga/effects";

import { uploadFilesAction } from "./actions";

function* sendFiles({ payload }: ReturnType<typeof uploadFilesAction>) {
    const { upload_students_general_info, upload_owed_students, upload_word_template } = payload;
    let uploadStudentsError = null;
    if (upload_students_general_info) {
        const { fetchFunc, file } = upload_students_general_info;
        if (file) {
            const { error } = yield call(fetchFunc, { files: file });
            uploadStudentsError = error;
        }
    }

    if (!uploadStudentsError && upload_owed_students) {
        const { fetchFunc, file } = upload_owed_students;
        if (file) {
            yield call(fetchFunc, { files: file });
        }
    }

    if (upload_word_template) {
        const { fetchFunc, file } = upload_word_template;
        if (file) {
            yield call(fetchFunc, { files: file });
        }
    }
}

export function* uploadFilesWatchers() {
    yield takeEvery(uploadFilesAction, sendFiles);
}
