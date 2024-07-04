import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";

import { classNames, createElementClass } from "$shared/lib";

import s from "$ui/Input/Input.module.scss";

interface IMultiLineInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    label?: string;
    error?: boolean;
}

export const MultiLineInput = forwardRef<HTMLTextAreaElement, IMultiLineInputProps>(
    ({ className, label, error, ...props }, ref) => {
        const textareaClassName = createElementClass("u-input", error ? "required" : "");
        return (
            <div className={s.input_container}>
                {label && <label>{label}</label>}
                <textarea
                    className={classNames(textareaClassName, s.textarea, className)}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
