import type { FC } from "react";
import { classNames } from "shared/lib/classNames";

import s from "./NotificationItem.module.scss";

interface INotificationItemProps {
    className?: string;
    status: "success" | "error" | "print" | "in progress";
}

export const NotificationItem: FC<INotificationItemProps> = ({ className }) => {
    return <li className={classNames(className)}></li>;
};
