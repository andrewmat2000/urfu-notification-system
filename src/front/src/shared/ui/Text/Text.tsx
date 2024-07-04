import type { FC, HTMLAttributes } from "react";

import { classNames } from "$shared/lib";

import s from "./Text.module.scss";

interface ITextProps extends HTMLAttributes<HTMLSpanElement> {
    size?: "md" | "lg";
    color?: "blue_main" | "regular" | "error";
    fontWeight?: "semibold" | "bold";
    text?: string;
}

export const Text: FC<ITextProps> = ({
    className,
    text,
    size = "md",
    color = "regular",
    fontWeight = "semibold",
    children,
    ...props
}) => {
    const value = text ? text : children;
    return (
        <span
            className={classNames(s.text, s[color], s[size], s[fontWeight], className)}
            {...props}
        >
            {value}
        </span>
    );
};
