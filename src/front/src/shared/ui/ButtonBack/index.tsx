import type { FC } from "react";

import { classNames } from "$shared/lib";
import { Button, IconArrow } from "$ui";

import s from "./ButtonBack.module.scss";

export const ButtonBack: FC<Omit<Parameters<typeof Button>[0], "variant" | "children">> = ({
    className,
    type = "button",
    ...otherProps
}) => {
    return (
        <Button
            className={classNames(s.button_back, className)}
            variant={"text"}
            type={type}
            {...otherProps}
        >
            <IconArrow direction={"right"} />
        </Button>
    );
};
