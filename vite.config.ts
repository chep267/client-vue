/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { resolve } from 'node:path';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import pluginVue from '@vitejs/plugin-vue';
import pluginVuetify from 'vite-plugin-vuetify';
import pluginBasicSsl from '@vitejs/plugin-basic-ssl';
import pluginTailwindcss from '@tailwindcss/vite';
import pluginViteCompression from 'vite-plugin-compression';
import { visualizer as pluginVisualizer } from 'rollup-plugin-visualizer';

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
        host: process.env.VITE_APP_CLIENT_HOST || 'localhost',
        port: Number(process.env.VITE_APP_CLIENT_PORT) || 3000,
        isGzip: process.env.VITE_APP_BUILD_GZIP === 'true',
    };

    return defineConfig({
        plugins: [
            pluginTailwindcss(),
            pluginVue(),
            pluginBasicSsl(),
            pluginVuetify({
                autoImport: true,
                styles: {
                    configFile: './src/styles/settings.scss',
                },
            }),
            config.isGzip
                ? pluginViteCompression({
                      algorithm: 'gzip', // Use gzip compression
                      ext: '.gz', // Output extension
                      threshold: 10240, // Only compress files larger than 10KB
                      deleteOriginFile: false, // Keep original files
                  })
                : undefined,
            config.isDevMode ? pluginVisualizer({ filename: 'stats.html', open: false }) : undefined,
        ],
        resolve: {
            alias: {
                ...resolveAlias(),
                vue: 'vue/dist/vue.esm-bundler.js',
            },
        },
        build: {
            outDir: 'dist',
            target: 'esnext',
            minify: 'esbuild',
            sourcemap: false,
            chunkSizeWarningLimit: 500,
            assetsInlineLimit: 4096,
            cssCodeSplit: true,
        },
        server: {
            host: config.host,
            port: config.port,
            open: config.isDevMode,
        },
        optimizeDeps: {
            include: ['vue', 'vuetify'],
            rolldownOptions: {
                treeshake: true,
                output: {
                    minifyInternalExports: true,
                },
            },
        },
    });
};
