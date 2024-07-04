import { type FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useStudentList } from "$entities/Student";
import { type Header, Table } from "$ui";

import { Row } from "./Row";

import s from "./StudentListPage.module.scss";

const headers: Header[] = [
    { title: "ФИО", style: { width: 350 } },
    { title: "Номер Телефона", style: { width: 200 } },
    { title: "Институт", style: { width: 200 } },
    { title: "Группа", style: { width: 180 } },
    { title: "Задолженность", style: { width: 180 } },
    { title: "Дата оплаты", style: { width: 200 } },
    { title: "", style: { width: 180 } },
];

export const StudentListPage: FC = () => {
    const { isLoading, data, error } = useStudentList(null);
    const navigate = useNavigate();

    const handleClickUserProfile = useCallback((studentId: string) => {
        if (!studentId) {
            return;
        }
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
            {data?.map(student => (
                <Row
                    key={student.id}
                    student={student}
                    onClickUserProfile={handleClickUserProfile}
                />
            ))}
        </Table>
    );
};
