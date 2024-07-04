import type { BackgroundColor, ComponentColor, FontColor } from "$models";

export const createColorClass = (
    color: ComponentColor | undefined,
    colorPosition: "font" | "bg"
): undefined | FontColor | BackgroundColor => {
    if (!color) return undefined;

    const prefix = colorPosition === "font" ? "clr-" : "bg-";
    return (prefix + color) as FontColor | BackgroundColor;
};
