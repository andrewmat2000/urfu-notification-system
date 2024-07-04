import type { FC } from "react";

interface ILoaderProps {
    withLogo?: boolean;
    size?: number;
}
export const Loader: FC<ILoaderProps> = ({ withLogo = false, size = 48 }) => {
    return (
        <div className="u-preloader-mini">
            <svg
                className="u-preloader-mini-container"
                width={`${size}`}
                height={`${size}`}
                viewBox={`0 0 ${size} ${size}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx={`${size / 2}`}
                    cy={`${size / 2}`}
                    r={`${size / 2 - 1}`}
                    stroke="#1E4391"
                    strokeWidth="2"
                />
                <circle
                    className="u-preloader-mini-dot"
                    cx={`${(size / 7.38).toFixed(1)}`}
                    cy={`${(size / 7.38).toFixed(1)}`}
                    r={`${(size / 7.38).toFixed(1)}`}
                    fill="#1E4391"
                />
            </svg>
        </div>
    );
};
