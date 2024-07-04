import webpack from "webpack";

import { buildCssLoaders } from "./loaders/buildCssLoaders";
import { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        use: [
            {
                loader: "file-loader",
            },
        ],
    };

    const typeScriptLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };

    const sassLoader = buildCssLoaders(isDev);

    return [fileLoader, typeScriptLoader, ...sassLoader];
}
