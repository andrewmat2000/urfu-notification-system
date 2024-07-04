import type { FC } from "react";

import s from "shared/ui/Table/EmptyRow/EmptyRow.module.scss";

interface IEmptyRowProps {
    colSpan?: number;
}

export const EmptyRow: FC<IEmptyRowProps> = ({ colSpan = 1 }) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <h2 className={s.empty_data}>Нет Данных</h2>
            </td>
        </tr>
    );
};
