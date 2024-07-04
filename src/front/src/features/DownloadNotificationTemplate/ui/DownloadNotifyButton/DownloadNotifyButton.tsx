import { memo } from "react";

import { baseRtkApi } from "$shared/api";
import { classNames } from "$shared/lib";
import { Button, IconDownload } from "$ui";

import s from "./DownloadNotifyButton.module.scss";

interface IDownloadNotifyButtonProps {
    url: string;
    className?: string;
    variant?: Parameters<typeof Button>[0]["variant"];
    disabled?: boolean;
}

export const DownloadNotifyButton = memo(
    ({ className, url, variant = "text", disabled }: IDownloadNotifyButtonProps) => {
        const handleDownload = () => window.open(`/${baseRtkApi.reducerPath}${url}`);

        return (
            <Button
                className={classNames(s.button, className)}
                variant={variant}
                onClick={handleDownload}
                disabled={disabled}
            >
                <IconDownload />
            </Button>
        );
    }
);
