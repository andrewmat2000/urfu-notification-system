import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "$app/App";
import { ErrorBoundary, StoreProvider } from "$app/providers";

import "./index.scss";

import "urfu-ui-kit-vanilla/src/main.ts";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ErrorBoundary>
                <StoreProvider>
                    <App />
                </StoreProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </React.StrictMode>
);
