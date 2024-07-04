import type { ValueOf } from "$models/types";

type Colors = {
    0: "blue-main";
    1: "blue-secondary";
    2: "blue-dark";
    3: "blue-60";
    4: "blue-40";
    5: "blue-20";
    6: "red-main";
    7: "red-dark";
    8: "red-60";
    9: "gray-60";
    10: "gray-40";
    11: "gray-20";
    12: "background";
    13: "black-main";
    14: "green";
    15: "pink";
    16: "orange";
    17: "violet";
};

export type ComponentColor = ValueOf<Colors>;
export type FontColor = `clr-${ValueOf<Colors>}`;
export type BackgroundColor = `bg-${ValueOf<Colors>}`;

export type IProps = {
    fontWeight?: 400 | 500 | 600;
    fontColor?: ComponentColor;
    bgColor?: ComponentColor;
};
