import type { ButtonHTMLAttributes, FC } from "react";

import type { IProps } from "$models";
import { classNames, createColorClass, createElementClass, createFontClass } from "$shared/lib";

import { Loader } from "../Loader";

interface IButtonProps extends IProps, ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "lg" | "sm";
    viewType?: "primary" | "danger" | "simple";
    variant?: "default" | "outline" | "text";
    loading?: boolean;
}

export const Button: FC<IButtonProps> = ({
    className,
    size = "lg",
    viewType = "primary",
    variant = "default",
    fontWeight = 400,
    fontColor,
    bgColor,
    loading,
    disabled,
    children,
    ...props
}) => {
    const fontWeightClass = createFontClass(fontWeight);
    const fontClass = createColorClass(fontColor, "font");
    const bgClass = createColorClass(bgColor, "bg");
    const buttonVariant = variant === "default" ? "" : variant;
    const buttonType = viewType === "primary" ? "" : viewType;
    const buttonClass = createElementClass("u-button", buttonVariant, buttonType);

    return (
        <button
            className={classNames(
                buttonClass,
                { "u-button-small": size === "sm" },
                fontWeightClass,
                fontClass,
                bgClass,
                className
            )}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? <Loader size={30} /> : children}
        </button>
    );
};
