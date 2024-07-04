import type { FC } from "react";

import type { StudentListItem } from "$entities/Student";
import { DownloadNotifyButton } from "$features/DownloadNotificationTemplate";
import { notifyEndpoints } from "$shared/api";
import { Button, IconNotify, IconUser } from "$ui";

import s from "./Row.module.scss";

interface IRowProps {
    student: StudentListItem;
    onClickUserProfile: (studentId: string) => void;
}

export const Row: FC<IRowProps> = ({
    student: {
        id,
        firstName,
        lastName,
        surname,
        group,
        email,
        institute,
        phoneNumber,
        numberOfAgreement,
        amountOfDebt,
    },
    onClickUserProfile,
}: IRowProps) => {
    const handleClickUserProfile = () => onClickUserProfile(id);

    return (
        <tr>
            <td>{`${lastName} ${firstName} ${surname}`}</td>
            <td>{phoneNumber}</td>
            <td>{institute.name}</td>
            <td>{group.name}</td>
            <td>{amountOfDebt} руб.</td>
            <td>02.02.2023</td>
            <td>
                <div className={s.icons}>
                    <Button
                        className={s.button}
                        variant={"text"}
                        onClick={handleClickUserProfile}
                    >
                        <IconUser />
                    </Button>
                    <DownloadNotifyButton
                        url={`${notifyEndpoints.GET_WITH_AGREEMENT}?agreementNumber=${numberOfAgreement}`}
                        variant={"text"}
                    />
                    <Button
                        className={s.button}
                        variant={"text"}
                    >
                        <IconNotify />
                    </Button>
                </div>
            </td>
        </tr>
    );
};
