import type { FC } from "react";

import { AdminTabs } from "./AdminTabs";
import { HeaderActions } from "./HeaderActions";
import { HeaderDetailActions } from "./HeaderDetailActions";

import s from "./Header.module.scss";

export const Header: FC = () => {
    return (
        <div className={s.header}>
            <AdminTabs />
            <HeaderDetailActions />
            <HeaderActions />
        </div>
    );
};
