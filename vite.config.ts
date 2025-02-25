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
import tailwindcss from '@tailwindcss/vite';

/** module path */
import tsPaths from './tsconfig.app.json' with { type: 'json' };

/** Resolve tsconfig.json paths to alias key */
function resolveAlias() {
    const paths = Object.entries(tsPaths.compilerOptions.paths);
    const alias = {} as Record<string, string>;
    for (let i = 0, n = paths.length; i < n; ++i) {
        const [key, value] = paths[i];
        const aKey = key.replace('/*', '');
        alias[aKey] = resolve(__dirname, value[0].replace('/*', ''));
    }
    return alias;
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
    process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));
    const config = {
        isDevMode: process.env.VITE_APP_MODE === 'dev',
        port: Number(process.env.VITE_APP_PORT) || 3000,
        host: process.env.VITE_APP_HOST || 'localhost',
    };
    return defineConfig({
        plugins: [vue(), basicSsl(), vuetify(), tailwindcss()],
        resolve: {
            alias: {
                ...resolveAlias(),
                vue: 'vue/dist/vue.esm-bundler.js',
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        },
        build: {
            target: 'esnext',
            sourcemap: config.isDevMode,
            rollupOptions: {
                output: {
                    manualChunks: {
                        'start-screen': ['./src/modules/module-auth/screens/StartScreen.vue'],
                        'auth-screen': ['./src/modules/module-auth/screens/AuthScreen.vue'],
                        'main-screen': ['./src/modules/module-global/screens/MainScreen.vue'],
                        'not-found-screen': ['./src/modules/module-global/screens/NotFoundScreen.vue'],
                        'feed-screen': ['./src/modules/module-global/screens/FeedScreen.vue'],
                        'messenger-screen': ['./src/modules/module-global/screens/MessengerScreen.vue'],
                        'calendar-screen': ['./src/modules/module-calendar/screens/CalendarScreen.vue'],
                    },
                },
            },
        },
        server: {
            host: config.host,
            port: config.port,
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
