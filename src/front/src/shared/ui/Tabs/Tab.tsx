import type { FC, HTMLAttributes } from "react";

import { classNames } from "$shared/lib";

interface ITabProps extends HTMLAttributes<HTMLButtonElement> {
    active: boolean;
}

export const Tab: FC<ITabProps> = ({ className, active, ...props }) => {
    return (
        <button
            className={classNames("u-tab-line-secondary", { "u-tab-active": active }, className)}
            {...props}
        />
    );
};
