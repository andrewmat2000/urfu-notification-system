import { Configuration } from "webpack-dev-server";

import { BuildOptions } from "./types/config";

export function buildDevServer(options: BuildOptions): Configuration {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true,
        proxy: {
            "/api": process.env.REACT_PROXY_URL ?? "http://localhost:5125",
        },
    };
}
