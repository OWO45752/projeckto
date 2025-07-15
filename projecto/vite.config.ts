import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import path from "path";

// Vite Plugins
import { patchCssModules } from "vite-css-modules";

// PostCSS Plugins
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import postcssImport from "postcss-import";


// https://vite.dev/config/
export default defineConfig({
    plugins: [
        patchCssModules(
            {
                generateSourceTypes: true,
            }
        ),

        react(),
    ],

    resolve: {
        alias: {

            // Workarouds
            "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",

            // Project UwU
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@stores": path.resolve(__dirname, "./src/stores"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@miko": path.resolve(__dirname, "./src"),
        },
    },

    css: {
        postcss: {
            plugins: [
                postcssImport(),
                postcssPresetEnv(),
                autoprefixer(),
            ]
        },

        modules: {
            localsConvention: "camelCase",
        },
    },
});
