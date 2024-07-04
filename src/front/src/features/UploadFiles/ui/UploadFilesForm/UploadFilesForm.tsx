import type { FC, FormEvent } from "react";
import { useRef } from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { uploadFilesAction } from "$features/UploadFiles/model/actions";
import { Button, UncontrolledInputFile } from "$ui";

import { useUploadGeneralStudentInfoList, useUploadOwedStudentInfoList, useUploadWordTemplate } from "../../api";

import s from "./UploadFilesForm.module.scss";

const errorText = "Отправка файлa завершилась с ошибкой, проверьте ваши файлы или попробуйте позже";

export const UploadFilesForm: FC = memo(() => {
    const dispatch = useDispatch();
    const formRef = useRef<HTMLFormElement>(null);
    const [generalInfo, setGeneralInfo] = useState<File | null>(null);
    const [owedStudentInfo, setOwedStudentInfo] = useState<File | null>(null);
    const [wordTemplate, setWordTemplate] = useState<File | null>(null);
    const [
        uploadGeneralStudentsInfo,
        {
            isLoading: isUploadGeneralInfoLoading,
            error: uploadGeneralInfoError,
            reset: resetGeneralInfo,
            isSuccess: uploadGeneralInfoSuccess,
        },
    ] = useUploadGeneralStudentInfoList();
    const [
        uploadOwedStudentsInfo,
        {
            isLoading: isUploadOwedInfoLoading,
            error: uploadOwedInfoError,
            reset: resetOwedInfo,
            isSuccess: uploadOwedInfoSuccess,
        },
    ] = useUploadOwedStudentInfoList();
    const [
        uploadWordTemplate,
        {
            isLoading: isUploadWordTemplateLoading,
            error: uploadWordTemplateError,
            reset: resetWordTemplate,
            isSuccess: uploadWordTemplateSuccess,
        },
    ] = useUploadWordTemplate();

    const isLoading = isUploadGeneralInfoLoading || isUploadOwedInfoLoading || isUploadWordTemplateLoading;

    const reset = useCallback(() => {
        resetGeneralInfo();
        resetOwedInfo();
        resetWordTemplate();
        formRef.current?.reset();
    }, []);

    useEffect(() => {
        if (uploadWordTemplateSuccess) {
            resetWordTemplate();
        }

        if (uploadGeneralInfoSuccess) {
            resetGeneralInfo();
        }

        if (uploadOwedInfoSuccess) {
            resetOwedInfo();
        }
    }, [uploadGeneralInfoSuccess, uploadOwedInfoSuccess, uploadWordTemplateSuccess]);

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const handleSubmitForm = useCallback(
        async (formEvent: FormEvent<HTMLFormElement>) => {
            formEvent.preventDefault();
            dispatch(
                uploadFilesAction({
                    upload_students_general_info: {
                        fetchFunc: uploadGeneralStudentsInfo,
                        file: generalInfo,
                    },
                    upload_owed_students: {
                        fetchFunc: uploadOwedStudentsInfo,
                        file: owedStudentInfo,
                    },
                    upload_word_template: {
                        fetchFunc: uploadWordTemplate,
                        file: wordTemplate,
                    },
                })
            );
        },
        [
            generalInfo,
            owedStudentInfo,
            wordTemplate,
            uploadGeneralStudentsInfo,
            uploadOwedStudentsInfo,
            uploadWordTemplate,
        ]
    );

    return (
        <form
            className={s.form}
            ref={formRef}
            onSubmit={handleSubmitForm}
        >
            <UncontrolledInputFile
                label={"Загрузить данные о студентах"}
                accept={".csv,.xlsx"}
                onChange={setGeneralInfo}
                disabled={isLoading}
                error={uploadGeneralInfoError ? errorText : null}
            />
            <UncontrolledInputFile
                label={"Загрузить данные о долгах"}
                accept={".csv,.xlsx"}
                onChange={setOwedStudentInfo}
                disabled={isLoading}
                error={uploadOwedInfoError ? errorText : null}
            />
            <UncontrolledInputFile
                label={"Загрузить шаблон уведомления"}
                accept={".doc, .docx, .rtf"}
                onChange={setWordTemplate}
                disabled={isLoading}
                error={uploadWordTemplateError ? errorText : null}
            />
            <Button
                type={"submit"}
                loading={isLoading}
            >
                Отправить
            </Button>
        </form>
    );
});
