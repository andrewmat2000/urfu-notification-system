import type { FC } from "react";

import type { IIconProps } from "$models";
import { classNames } from "$shared/lib";

interface IIconDownload extends IIconProps {
    variant?: "default" | "line";
}

export const IconDownload: FC<IIconDownload> = ({ className, variant = "default", ...props }) => {
    const iconClass = variant === "default" ? "" : "-line";
    return (
        <i
            className={classNames("u-icon", `icon-download${iconClass}`, className)}
            {...props}
        />
    );
};
