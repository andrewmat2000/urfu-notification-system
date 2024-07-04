import { memo } from "react";

import s from "./NotificationList.module.scss";

export const NotificationList = memo(() => {
    return (
        <section className={s.notification_list__container}>
            <header>Уведомления</header>
            <ul>
                <li></li>
            </ul>
        </section>
    );
});
