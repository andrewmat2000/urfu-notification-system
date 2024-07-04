import type { FC } from "react";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AppRoutes, RoutePath } from "$shared/routes";
import { Tab } from "$ui";

import s from "./AdminTabs.module.scss";

export const AdminTabs: FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isAdminPanel = pathname.includes("admin");

    const clickTabHandler = useCallback((path: string) => {
        return () => navigate(path);
    }, []);

    if (!isAdminPanel) return null;

    return (
        <div className={s.tabs}>
            <Tab
                active={pathname.includes(AppRoutes.ADMIN_USERS)}
                onClick={clickTabHandler(RoutePath["admin/users"])}
            >
                Пользователи
            </Tab>
            <Tab
                active={pathname.includes(AppRoutes.ADMIN_LOGS)}
                onClick={clickTabHandler(RoutePath["admin/logs"])}
            >
                Логи
            </Tab>
        </div>
    );
};
