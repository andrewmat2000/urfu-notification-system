const typeScriptExtensions = [".ts", ".cts", ".mts", ".tsx"];

const allExtensions = [...typeScriptExtensions, ".js", ".jsx"];

module.exports = {
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    plugins: ["react", "react-hooks", "@typescript-eslint", "simple-import-sort", "import"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    settings: {
        react: {
            version: "detect",
        },
        "import/parsers": {
            "@typescript-eslint/parser": typeScriptExtensions,
        },
        "import/extensions": allExtensions,
        "import/resolver": {
            node: {
                extensions: allExtensions,
            },
        },
    },

    env: {
        browser: true,
        es2021: true,
    },
    rules: {
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/ban-ts-comment": "error",

        "react/display-name": "off",
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "react/jsx-props-no-spreading": "warn",
        "react/react-in-jsx-scope": [0],
        "react/no-unresolved": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        "import/no-cycle": "error",
        "no-undef": "off",
        "no-console": "warn",
        "prefer-const": "warn",
        "no-unused-vars": "warn",
        indent: [2, 4],
        "linebreak-style": "off",
        quotes: [1, "double"],
        semi: [1, "always"],

        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
    overrides: [
        {
            files: ["**/src/**/*.{jsx,tsx}"],
            rules: {
                indent: "off",
            },
        },
        {
            files: ["**/src/shared/ui/**/**.tsx"],
            rules: {
                "react/jsx-props-no-spreading": "off",
            },
        },
        {
            files: ["**/src/**/*.ts"],
            rules: {
                "max-lines": ["error", 400],
            },
        },
        {
            files: ["**/src/**/*.tsx"],
            rules: {
                "max-lines": ["error", 300],
            },
        },
        {
            files: ["**/src/**/*.{ts,tsx}"],
            rules: {
                "simple-import-sort/imports": [
                    "error",
                    {
                        groups: [
                            ["^react", "^@?\\w", "^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)"],
                            ["^\\$?\\w"],
                            [
                                "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
                            ],
                            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                            ["^.+\\.s?css$"],
                        ],
                    },
                ],
            },
        },
    ],
};
