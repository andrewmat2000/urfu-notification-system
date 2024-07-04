import type { FC } from "react";

import { classNames } from "$shared/lib";

import s from "shared/ui/Table/LoadingRow/LoadingRow.module.scss";

interface ILoadingRowProps {
    colSpan?: number;
}

export const LoadingRow: FC<ILoadingRowProps> = ({ colSpan = 1 }) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className={classNames("u-preloader-mini", s.loading_container)}>
                    <svg
                        className="u-preloader-mini-container"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="24"
                            cy="24"
                            r="23"
                            stroke="#1E4391"
                            strokeWidth="2"
                        />
                        <circle
                            className="u-preloader-mini-dot"
                            cx="6.5"
                            cy="6.5"
                            r="6.5"
                            fill="#1E4391"
                        />
                    </svg>
                </div>
            </td>
        </tr>
    );
};
