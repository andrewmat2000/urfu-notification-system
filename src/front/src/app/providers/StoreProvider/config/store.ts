import type { ReducersMapObject } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { baseRtkApi } from "$shared/api";

import { rootSaga } from "./rootSaga";
import type { StateSchema } from "./StateSchema";

import "regenerator-runtime/runtime";

const rootReducer: ReducersMapObject<StateSchema> = {
    [baseRtkApi.reducerPath]: baseRtkApi.reducer,
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat([sagaMiddleware, baseRtkApi.middleware]),
});

sagaMiddleware.run(rootSaga);
