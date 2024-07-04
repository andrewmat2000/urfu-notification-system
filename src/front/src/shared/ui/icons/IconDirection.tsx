import type { FC } from "react";

import type { ArrowDirection, IIconProps } from "$models";
import { classNames } from "$shared/lib";

interface IIconDirectionProps extends IIconProps {
    direction: ArrowDirection;
}

export const IconDirection: FC<IIconDirectionProps> = ({ className, direction, ...props }) => {
    return (
        <i
            className={classNames("u-icon", `icon-${direction}`, className)}
            {...props}
        />
    );
};
