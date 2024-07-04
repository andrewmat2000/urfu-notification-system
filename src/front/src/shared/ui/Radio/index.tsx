import type { FC } from "react";
import React from "react";

import { classNames } from "$shared/lib";

interface IRadioProps {
    className?: string;
    labelPosition?: "left" | "right";
    disabled?: boolean;
    label: string;
    checked: boolean;
    onClick: (e: React.MouseEvent<HTMLLabelElement>) => void;
}

export const Radio: FC<IRadioProps> = ({ className, labelPosition = "right", disabled, label, checked, onClick }) => {
    return (
        <label
            className={classNames("u-radio", `u-radio-text-${labelPosition}`, className)}
            onClick={onClick}
        >
            <input
                hidden={true}
                disabled={disabled}
                type="radio"
                checked={checked}
            />
            <div />
            <span>{label}</span>
        </label>
    );
};
