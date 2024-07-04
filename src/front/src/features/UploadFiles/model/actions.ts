import { createAction } from "@reduxjs/toolkit";

import type { UploadFilesPayload } from "./types";

export const uploadFilesAction = createAction<UploadFilesPayload>("action");
