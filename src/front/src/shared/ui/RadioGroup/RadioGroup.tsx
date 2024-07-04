import type { ReactNode } from "react";
import React, { useMemo } from "react";

import { RadioGroupProvider } from "./RadioGroupContext";

interface IRadioGroupProps<T> {
    value: T;
    children: ReactNode;
    onChange: (value: T, e: React.MouseEvent<HTMLLabelElement>) => void;
}

export const RadioGroup = <T,>({ children, value, onChange }: IRadioGroupProps<T>) => {
    const providerValue = useMemo(
        () => ({
            value,
            onChange,
        }),
        [value, onChange]
    );

    return <RadioGroupProvider value={providerValue}>{children}</RadioGroupProvider>;
};
