import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import { LoginPage } from "$pages";
import { Header } from "$widgets";

import { routeConfig } from "./providers";

import s from "./App.module.scss";

const App = () => {
    return (
        <Routes>
            <Route
                element={<LoginPage />}
                index={true}
            />
            <Route
                element={
                    <div className={s.app}>
                        <Suspense fallback="">
                            <div className={s.page_wrapper}>
                                <Header />
                                <div className={s.page_content__container}>
                                    <Outlet />
                                </div>
                            </div>
                        </Suspense>
                    </div>
                }
            >
                {Object.values(routeConfig).map(({ element, path }) => (
                    <Route
                        key={path}
                        element={element}
                        path={path}
                    />
                ))}
            </Route>
        </Routes>
    );
};

export default App;
