import type { FC } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useUserList } from "$entities/User";
import type { Header } from "$ui";
import { Table } from "$ui";

import { Row } from "./Row";

import s from "./UserListPage.module.scss";

const headers: Header[] = [
    { title: "ФИО", style: { width: 350 } },
    { title: "Роль", style: { width: 350 } },
    { title: "Почта", style: { width: 350 } },
    { title: "Номер Телефона", style: { width: 350 } },
    { title: "", style: { width: 140 } },
];

export const UserListPage: FC = () => {
    const { isLoading, data, error } = useUserList(null);
    const navigate = useNavigate();

    const handleClickUserProfile = useCallback((studentId: string) => {
        navigate(`${studentId}/agreement`);
    }, []);

    return (
        <Table
            headers={headers}
            theadClassName={s.table_head}
            tbodyClassName={s.table_body}
            stickyHeader={true}
            tableHeight={700}
            isLoading={isLoading}
            isEmpty={Boolean(error) || !data || data.length === 0}
        >
            {data?.map(user => (
                <Row
                    key={user.id}
                    user={user}
                    onClickUserProfile={handleClickUserProfile}
                />
            ))}
        </Table>
    );
};
