import type { ReactNode } from "react";
import React, { createContext } from "react";

interface IRadioGroupProviderValue<T> {
    value: T;
    onChange: (newValue: T, e: React.MouseEvent<HTMLLabelElement>) => void;
}

interface IRadioGroupProviderProps<T> {
    value: IRadioGroupProviderValue<T>;
    children: ReactNode;
}

const RadioGroupContext = createContext<IRadioGroupProviderValue<any>>({
    value: undefined,
    onChange: () => {},
});

export const RadioGroupProvider = <T,>({ value, children }: IRadioGroupProviderProps<T>) => {
    return <RadioGroupContext.Provider value={value}>{children}</RadioGroupContext.Provider>;
};
