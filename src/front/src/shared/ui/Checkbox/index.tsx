import type { FC } from "react";
import React from "react";

import { classNames } from "$shared/lib";

import s from "./Checkbox.module.scss";

interface ICheckboxProps {
    className?: string;
    labelPosition?: "left" | "right";
    disabled?: boolean;
    label: string;
    checked: boolean;
    onClick: (e: React.MouseEvent<HTMLLabelElement>, isChecked: boolean) => void;
}

export const Checkbox: FC<ICheckboxProps> = ({
    className,
    labelPosition = "right",
    disabled,
    label,
    checked,
    onClick,
}) => {
    const clickHandler = (e: React.MouseEvent<HTMLLabelElement>) => {
        onClick?.(e, !checked);
    };

    return (
        <label
            className={classNames(s.checkbox, "u-checkbox", `u-checkbox-text-${labelPosition}`, className)}
            onClick={clickHandler}
        >
            <input
                disabled={disabled}
                type="checkbox"
            />
            <div></div>
            <span>{label}</span>
        </label>
    );
};
