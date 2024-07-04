import { type FC, useCallback } from "react";

import type { User } from "$entities/User";
import { Button, IconPencil, IconUser } from "$ui";

import s from "./Row.module.scss";

interface IRowProps {
    user: User;
    onClickUserProfile: (studentId: string) => void;
}

export const Row: FC<IRowProps> = ({
    user: { id, firstName, secondName, patronymic, email, phone, roleId, programId, createdBy },
    onClickUserProfile,
}: IRowProps) => {
    const handleClickUserProfile = useCallback(() => onClickUserProfile(id), [onClickUserProfile, id]);

    return (
        <tr>
            <td>{`${firstName} ${secondName} ${patronymic}`}</td>
            <td>{roleId}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <div className={s.icons}>
                    <Button
                        className={s.button}
                        variant={"text"}
                        onClick={handleClickUserProfile}
                    >
                        <IconUser />
                    </Button>
                    <Button
                        className={s.button}
                        variant={"text"}
                    >
                        <IconPencil />
                    </Button>
                </div>
            </td>
        </tr>
    );
};
