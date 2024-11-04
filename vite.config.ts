/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { resolve } from 'node:path';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import basicSsl from '@vitejs/plugin-basic-ssl';
import vueDevTools from 'vite-plugin-vue-devtools';

/** module path */
import tsPaths from './tsconfig.app.json' with { type: 'json' };

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
export default ({ mode }: ConfigEnv) => {
    process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));
    const isDevMode = process.env.VITE_APP_MODE === 'dev';
    const port = Number(process.env.VITE_APP_PORT) || 3000;

    return defineConfig({
        plugins: [vue(), vueDevTools(), vuetify(), basicSsl()],
        resolve: {
            alias: {
                ...resolveAlias(),
                vue: 'vue/dist/vue.esm-bundler.js',
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        },
        build: {
            target: 'esnext',
            sourcemap: isDevMode,
            rollupOptions: {
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
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['legacy-js-api'],
                },
            },
        },
    });
};
