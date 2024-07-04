import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { classNames } from "shared/lib/classNames";

import { createElementClass } from "$shared/lib";

import s from "./Input.module.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(({ className, label, error = false, ...props }, ref) => {
    const inputClassName = createElementClass("u-input", error ? "required" : "");

    return (
        <div className={s.input_container}>
            {label && <label>{label}</label>}
            <input
                className={classNames(inputClassName, className)}
                ref={ref}
                {...props}
            />
        </div>
    );
});
