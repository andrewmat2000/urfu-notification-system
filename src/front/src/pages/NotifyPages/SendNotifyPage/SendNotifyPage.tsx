import type { FC, FormEvent } from "react";
import { useState } from "react";

import { useSendNotifyAll } from "$features/SendNotify";
import { ReceiverError } from "$features/SendNotify/model";
import type { Header } from "$ui";
import { Button, Input, MultiLineInput, Table, Text, UncontrolledMultipleInputFile } from "$ui";

import s from "./SendNotifyPage.module.scss";

const tableHeaders: Header[] = [
    { title: "Студент" },
    { title: "Почта" },
    { title: "Номер документа" },
    { title: "Номер страницы" },
];

export const SendNotifyPage: FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [files, setFiles] = useState<File[] | null>(null);
    const [sendNotify, { data, isLoading, error }] = useSendNotifyAll();

    const isButtonDisabled = !files || !login.trim() || !password.trim() || !title.trim();

    const handleSendClick = (e: FormEvent) => {
        e.preventDefault();

        if (files) {
            sendNotify({
                login,
                password,
                messageTitle: title.trim(),
                messageText: text.trim(),
                files,
            });
        }
    };

    return (
        <>
            <form
                className={s.container}
                onSubmit={handleSendClick}
            >
                <div className={s.flex}>
                    <Input
                        value={login}
                        label={"Почта"}
                        placeholder={"email@example.ru"}
                        disabled={isLoading}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Input
                        value={password}
                        label={"Пароль"}
                        placeholder={"Пароль"}
                        type={"password"}
                        disabled={isLoading}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <Input
                    value={title}
                    label={"Тема письма"}
                    placeholder={"Тема письма"}
                    disabled={isLoading}
                    onChange={e => setTitle(e.target.value)}
                />
                <MultiLineInput
                    value={text}
                    label={"Текст письма"}
                    placeholder={"Текст письма"}
                    rows={3}
                    disabled={isLoading}
                    onChange={e => setText(e.target.value)}
                />
                <UncontrolledMultipleInputFile
                    accept={".pdf"}
                    disabled={isLoading}
                    onChange={setFiles}
                />
                {error && <Text color={"error"}>Произошла ошибка, попробуйте позже</Text>}
                <Button
                    disabled={isButtonDisabled}
                    loading={isLoading}
                >
                    Отправить
                </Button>
            </form>
            {data && (
                <div>
                    {data.messagesSended.length > 0 && (
                        <>
                            <h2>Успешно отправленные</h2>
                            <Table headers={tableHeaders}>
                                {data.messagesSended.map((el, i) => (
                                    <tr key={i}>
                                        <td>{el.receiver.fullName}</td>
                                        <td>{el.receiver.email}</td>
                                        <td>{el.documentNumber}</td>
                                        <td>{el.documentPage}</td>
                                    </tr>
                                ))}
                            </Table>
                        </>
                    )}
                    {data.pagesError.length > 0 && (
                        <>
                            <h2>Не отправленные</h2>
                            <Table headers={[...tableHeaders, { title: "Ошибка" }]}>
                                {data.pagesError.map((el, i) => {
                                    const errorText =
                                        el.receiverError === ReceiverError.StudentNotFound
                                            ? "Студент не найден"
                                            : "Номер договора не найден";
                                    return (
                                        <tr key={i}>
                                            <td>{el.receiver.fullName}</td>
                                            <td>{el.receiver.email}</td>
                                            <td>{el.documentNumber}</td>
                                            <td>{el.documentPage}</td>
                                            <td>{errorText}</td>
                                        </tr>
                                    );
                                })}
                            </Table>
                        </>
                    )}
                </div>
            )}
        </>
    );
};
