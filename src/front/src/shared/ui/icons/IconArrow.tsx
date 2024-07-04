import type { FC } from "react";

import type { ArrowDirection, IIconProps } from "$models";
import { classNames } from "$shared/lib";

interface IIconArrowProps extends IIconProps {
    direction: ArrowDirection;
}

export const IconArrow: FC<IIconArrowProps> = ({ className, direction, ...props }) => {
    return (
        <i
            className={classNames("u-icon", `icon-${direction}-arrow`, className)}
            {...props}
        />
    );
};
