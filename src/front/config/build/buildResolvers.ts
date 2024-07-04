import path from "path";
import * as process from "process";
import type webpack from "webpack";

import type { BuildOptions } from "./types/config";

const cwd = process.cwd();

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
    return {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
        preferAbsolute: true,
        modules: [options.paths.src, "node_modules"],
        mainFiles: ["index"],
        aliasFields: ["$config", "$app", "$pages", "$widgets", "$entities", "$shared", "$models", "$ui"],
        alias: {
            $config: path.join(cwd, "config"),
            $app: path.join(cwd, "src/app"),
            $pages: path.join(cwd, "src/pages"),
            $widgets: path.join(cwd, "src/widgets"),
            $features: path.join(cwd, "src/features"),
            $entities: path.join(cwd, "src/entities"),
            $shared: path.join(cwd, "src/shared"),
            $models: path.join(cwd, "src/shared/model"),
            $ui: path.join(cwd, "src/shared/ui"),
        },
    };
}
