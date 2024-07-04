import type { ChangeEvent } from "react";
import React, { type FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "shared/lib/classNames";

import { RoutePath } from "$shared/routes";
import { Button, Input } from "$ui";

import s from "./LoginPage.module.scss";

export const LoginPage: FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleChangeLogin = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }, []);

    const handleChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    const handleLogIn = useCallback(() => {
        navigate(RoutePath.students);
    }, []);

    return (
        <div className={classNames(s.login_page)}>
            <div className={s.login_form}>
                <Input
                    value={login}
                    placeholder={"Логин"}
                    onChange={handleChangeLogin}
                />
                <Input
                    value={password}
                    placeholder={"Пароль"}
                    type={"password"}
                    onChange={handleChangePassword}
                />
                <Button onClick={handleLogIn}>Войти</Button>
            </div>
        </div>
    );
};
