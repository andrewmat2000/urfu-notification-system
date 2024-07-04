import { all, call } from "redux-saga/effects";

import { uploadFilesWatchers } from "$features/UploadFiles";

const root = [uploadFilesWatchers];

export function* rootSaga() {
    yield all(root.map(call));
}
