// Flat config ESLint v9 — gaya Dika
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
    // 1) Base JS recommended
    js.configs.recommended,

    // 2) TS recommended (sudah set parser)
    ...tseslint.configs.recommended,

    // 3) Matikan rules yang bentrok sama Prettier (flat-config version)
    configPrettier,

    // 4) Rules khusus gaya lo + plugin Prettier (jadikan formatting sebagai error)
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.js"],
        plugins: { prettier: prettierPlugin },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module"
                // project: "./tsconfig.json" // <- aktifkan kalau butuh rules type-aware
            }
        },
        rules: {
            // --- Gaya utama ---
            quotes: ["error", "double", { avoidEscape: true }],
            semi: ["error", "always"],
            curly: ["error", "all"],
            "brace-style": ["error", "1tbs", { allowSingleLine: false }],

            // komentar di atas baris kode (bukan inline)
            "line-comment-position": ["error", { position: "above" }],
            "spaced-comment": ["error", "always", { markers: ["/"], exceptions: ["*"] }],

            // if/switch selalu newline setelah blok
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: ["block", "block-like"], next: ["if", "switch"] }
            ],

            // ternary wajib satu baris
            "multiline-ternary": ["error", "never"],

            // hindari await yang nggak perlu
            "no-return-await": "error",
            "@typescript-eslint/await-thenable": "error",

            // izinkan async executor (kamu pakai pola ini)
            "no-async-promise-executor": "off",

            // larang for/for-in/for-of & try/catch
            "no-restricted-syntax": [
                "error",
                { selector: "ForStatement", message: "Hindari for loop; pakai map/filter/forEach." },
                { selector: "ForInStatement", message: "Hindari for..in; pakai Object.keys/entries." },
                { selector: "ForOfStatement", message: "Hindari for..of; pakai array methods." },
                { selector: "TryStatement", message: "Hindari try/catch; pakai Promise .then/.catch." }
            ],

            // require() dinamis diizinkan
            "@typescript-eslint/no-var-requires": "off",

            // toleransi var/arg underscore
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

            // format by Prettier = error
            "prettier/prettier": ["error", {
                printWidth: 200,
                tabWidth: 4,
                singleQuote: false,
                semi: true,
                endOfLine: "lf"
            }]
        }
    },

    // 5) Ignores global (flat config pakai "ignores")
    {
        ignores: [
            "**/dist/**",
            "**/build/**",
            "**/node_modules/**"
        ]
    }
];
