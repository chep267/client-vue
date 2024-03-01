/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import { visualizer } from 'rollup-plugin-visualizer';
import basicSsl from '@vitejs/plugin-basic-ssl';

/** module path */
import tsPaths from './tsconfig.path.json' with { type: 'json' };

/** Resolve tsconfig.json paths to alias key */
function resolveAlias() {
    const paths = tsPaths.compilerOptions.paths;
    const alias = {};
    for (const [key, value] of Object.entries(paths)) {
        const aKey = key.replace('/*', '');
        alias[aKey] = resolve(__dirname, value[0].replace('/*', ''));
    }
    return alias;
}

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const isDevMode = process.env.VITE_APP_MODE === 'dev';
    const portENV = Number(process.env.VITE_APP_PORT);
    const port = isNaN(portENV) ? 8080 : portENV;

    return defineConfig({
        plugins: [basicSsl(), vue(), vuetify(), visualizer()],
        resolve: {
            alias: {
                ...resolveAlias(),
                vue: 'vue/dist/vue.esm-bundler.js',
            },
            extensions: ['.tsx', '.ts', '.js', '.jsx', '.vue'],
        },
        build: {
            target: 'esnext',
            sourcemap: isDevMode,
            rollupOptions: {
                treeshake: true,
                output: {
                    manualChunks: {
                        'start-screen': ['./src/modules/module-auth/screens/StartScreen.vue'],
                        'auth-screen': ['./src/modules/module-auth/screens/AuthScreen.vue'],
                    },
                },
            },
        },
        server: {
            host: process.env.VITE_APP_HOST,
            port,
            open: true,
        },
        esbuild: {
            target: 'esnext',
            legalComments: 'none',
            treeShaking: true,
            format: 'esm',
        },
    });
};
