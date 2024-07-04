import type { FC } from "react";

import { createElementClass } from "$shared/lib";

interface INotificationProps {
    text: string;
    variant?: "fail" | "success" | "warning";
}

export const Notification: FC<INotificationProps> = ({ text, variant = "" }) => {
    const notificationClassName = createElementClass("u-notification", variant);

    return (
        <div className={notificationClassName}>
            {text}
            <button className="u-notification-hide" />
        </div>
    );
};
