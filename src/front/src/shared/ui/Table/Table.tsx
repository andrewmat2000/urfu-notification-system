import type { CSSProperties, FC, HTMLAttributes } from "react";

import { classNames } from "$shared/lib";
import { EmptyRow } from "$ui/Table/EmptyRow";
import { LoadingRow } from "$ui/Table/LoadingRow";

import type { Header } from "./types";

import s from "./Table.module.scss";

interface ITableProps extends HTMLAttributes<HTMLTableElement> {
    containerClassName?: string;
    theadClassName?: string;
    tbodyClassName?: string;
    stickyHeader?: boolean;
    tableHeight?: number | string;
    isLoading?: boolean;
    isEmpty?: boolean;
    borderRadius?: CSSProperties["borderRadius"];
    headers: Header[];
}

export const Table: FC<ITableProps> = ({
    className,
    containerClassName,
    theadClassName,
    tbodyClassName,
    stickyHeader = false,
    tableHeight = "100%",
    isLoading = false,
    isEmpty = false,
    borderRadius,
    headers,
    children,
    style,
    ...props
}) => {
    return (
        <div
            className={classNames("u-table", containerClassName)}
            style={{ height: tableHeight, borderRadius }}
        >
            <table
                className={classNames("table", className)}
                style={{ borderRadius, ...style }}
                {...props}
            >
                <thead className={classNames(theadClassName, { [s.sticky]: stickyHeader })}>
                    <tr>
                        {headers.map(({ title, ...other }, i) => (
                            <th
                                key={`table-header-${i}`}
                                {...other}
                            >
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={tbodyClassName}>
                    {isLoading ? (
                        <LoadingRow colSpan={headers.length} />
                    ) : isEmpty ? (
                        <EmptyRow colSpan={headers.length} />
                    ) : (
                        children
                    )}
                </tbody>
            </table>
        </div>
    );
};
