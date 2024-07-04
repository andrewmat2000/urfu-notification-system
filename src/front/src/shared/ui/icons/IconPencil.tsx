import type { FC } from "react";

import type { IIconProps } from "$models";
import { classNames } from "$shared/lib";

export const IconPencil: FC<IIconProps> = ({ className, ...props }) => {
    return (
        <i
            className={classNames("u-icon icon-pencil", className)}
            {...props}
        />
    );
};
