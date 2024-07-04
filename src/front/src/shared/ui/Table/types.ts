import type { HTMLAttributes } from "react";

export interface Header extends HTMLAttributes<HTMLTableCellElement> {
    title: string;
}
