import type { FC } from "react";
import { classNames } from "shared/lib/classNames";

import s from "./InfoText.module.scss";

interface IInfoTextProps {
    className?: string;
    title: string;
    value: string;
    size?: "md" | "lg";
}

export const InfoText: FC<IInfoTextProps> = ({ className, title, value, size = "md" }) => {
    return (
        <span className={classNames(s.info_text, s[size], className)}>
            <span className={s.title}>{title}:</span>
            <span className={s.value}>{value}</span>
        </span>
    );
};
