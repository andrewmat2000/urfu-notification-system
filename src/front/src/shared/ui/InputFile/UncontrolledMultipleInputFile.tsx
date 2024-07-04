import type { ChangeEvent, FC, InputHTMLAttributes } from "react";
import { useCallback, useRef } from "react";
import { classNames } from "shared/lib/classNames";

import { Button, Input, Text } from "$shared/ui";

import s from "./InputFile.module.scss";

interface IUncontrolledInputFileProps {
    className?: string;
    label?: string;
    placeholder?: string;
    accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
    disabled?: boolean;
    error?: string | null;
    onChange?: (files: File[], ev: ChangeEvent<HTMLInputElement>) => void;
}

export const UncontrolledMultipleInputFile: FC<IUncontrolledInputFileProps> = ({
    className,
    label,
    placeholder,
    accept,
    disabled,
    error,
    onChange,
}) => {
    const ref = useRef<HTMLInputElement>(null);

    const handleClickButton = useCallback(() => {
        ref.current?.click();
    }, []);

    const handleChangeInput = useCallback(
        (ev: ChangeEvent<HTMLInputElement>) => {
            const files = ev.target.files;

            if (!files) {
                return;
            }

            const res = [];
            for (let i = 0; i < files.length; i++) {
                res.push(files[i]);
            }
            onChange?.(res, ev);
        },
        [onChange]
    );

    return (
        <label>
            {label}
            <div className={classNames(className, s.input_file__container)}>
                <Button
                    type={"button"}
                    disabled={disabled}
                    onClick={handleClickButton}
                >
                    Загрузить файл
                </Button>
                <Input
                    ref={ref}
                    className={s.input}
                    placeholder={placeholder}
                    type={"file"}
                    accept={accept}
                    multiple={true}
                    disabled={disabled}
                    onChange={handleChangeInput}
                />
            </div>
            {error && (
                <Text
                    className={s.error_text}
                    color={"error"}
                >
                    {error}
                </Text>
            )}
        </label>
    );
};
