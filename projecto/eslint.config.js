import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import stylistic from "@stylistic/eslint-plugin";
import sonarjs from "eslint-plugin-sonarjs";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
        },
    },

    sonarjs.configs.recommended,

    {
        plugins: {
            "@stylistic": stylistic,
        },
        rules: {

            /* ==== ESLint Rules ==== */
            complexity: ["error", {
                max: 20,
            }],

            /* ==== Stylistic Rules ==== */

            // Spacing
            "@stylistic/arrow-spacing": ["error", {
                before: true,
                after: true,
            }],
            "@stylistic/block-spacing": ["error", "always"],
            "@stylistic/comma-spacing": ["error", {
                before: false,
                after: true,
            }],
            "@stylistic/computed-property-spacing": ["error", "never"],
            "@stylistic/generator-star-spacing": ["error", "before"],
            "@stylistic/key-spacing": ["error", {
                beforeColon: false,
                afterColon: true,
                mode: "strict"
            }],
            "@stylistic/keyword-spacing": ["error", {
                before: true,
                after: true,
            }],
            "@stylistic/no-mixed-spaces-and-tabs": "error",
            "@stylistic/no-trailing-spaces": "error",
            "@stylistic/no-whitespace-before-property": "error",
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/rest-spread-spacing": ["error", "never"],
            "@stylistic/semi-spacing": ["error", {
                before: false,
                after: true,
            }],
            "@stylistic/space-before-blocks": ["error", "always"],
            "@stylistic/space-before-function-paren": ["error", "never"],
            "@stylistic/space-in-parens": ["error", "never"],
            "@stylistic/space-infix-ops": "error",
            "@stylistic/space-unary-ops": "error",
            "@stylistic/spaced-comment": ["error", "always", {
                line: {
                    exceptions: [
                        "@ts-check",
                        "@ts-nocheck",
                        "@ts-expect-error",
                        "@ts-ignore",
                    ]
                }
            }],
            "@stylistic/switch-colon-spacing": ["error", {
                before: false,
                after: true,
            }],
            "@stylistic/template-curly-spacing": ["error", "never"],
            "@stylistic/type-annotation-spacing": ["error", {
                before: false,
                after: true,
                overrides: {
                    arrow: {
                        before: true,
                        after: true,
                    }
                }
            }],
            "@stylistic/type-generic-spacing": ["error"],
            "@stylistic/type-named-tuple-spacing": ["error"],
            "@stylistic/yield-star-spacing": ["error", "after"],

            //

            "@stylistic/eol-last": ["error", "always"],

            "@stylistic/indent": ["error", 4],

            "@stylistic/quote-props": ["error", "as-needed"],
            "@stylistic/quotes": ["error", "double"],

            "@stylistic/comma-style": ["error", "last"],

            "@stylistic/semi": ["error", "always"],
            "@stylistic/semi-style": ["error", "last"],

            "@stylistic/dot-location": ["error", "property"],

            "@stylistic/lines-around-comment": ["error", {
                beforeBlockComment: true,
                beforeLineComment: true,

                allowBlockStart: true,
            }],

            "@stylistic/no-confusing-arrow": ["error", {
                allowParens: true,
                onlyOneSimpleParam: false
            }],
            "@stylistic/no-extra-parens": ["error", "all"],
            "@stylistic/no-extra-semi": "error",
            "@stylistic/no-floating-decimal": "error",
            "@stylistic/no-mixed-operators": "error",
            "@stylistic/no-multi-spaces": ["error", {
                ignoreEOLComments: true
            }],
            "@stylistic/no-multiple-empty-lines": ["error", {
                max: 2
            }],
            "@stylistic/no-tabs": "error",

            "@stylistic/padded-blocks": ["error", "never"],


            /* JSX */
            "@stylistic/jsx-closing-bracket-location": ["error", "line-aligned"],
            "@stylistic/jsx-curly-newline": ["error", "consistent"],
            "@stylistic/jsx-curly-spacing": ["error", {
                when: "never"
            }],
            "@stylistic/jsx-pascal-case": ["error", {
                allowAllCaps: false,
                allowLeadingUnderscore: false,
                allowNamespace: true,
            }],
            "@stylistic/jsx-quotes": ["error", "prefer-double"],
            "@stylistic/jsx-self-closing-comp": ["error", {
                component: true,
                html: true
            }],
            "@stylistic/jsx-tag-spacing": ["error", {
                beforeSelfClosing: "proportional-always"
            }],
        }
    }
);
