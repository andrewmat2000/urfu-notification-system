import type { FC } from "react";

import type { IIconProps } from "$models";
import { classNames } from "$shared/lib";

export const IconPlus: FC<IIconProps> = ({ className, ...props }) => {
    return (
        <i
            className={classNames("u-icon icon-plus", className)}
            {...props}
        />
    );
};
