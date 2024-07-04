import type { FC } from "react";

import type { IIconProps } from "$models";
import { classNames } from "$shared/lib";

export const IconSearch: FC<IIconProps> = ({ className, ...props }) => {
    return (
        <i
            className={classNames("u-icon icon-search", className)}
            {...props}
        />
    );
};
