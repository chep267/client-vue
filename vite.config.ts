/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { resolve } from 'node:path';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import basicSsl from '@vitejs/plugin-basic-ssl';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

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
            vue(),
            basicSsl(),
            vuetify({ autoImport: true }),
            tailwindcss(),
            config.isGzip
                ? viteCompression({
                      algorithm: 'gzip', // Use gzip compression
                      ext: '.gz', // Output extension
                      threshold: 10240, // Only compress files larger than 10KB
                      deleteOriginFile: false, // Keep original files
                  })
                : undefined,
            config.isDevMode ? visualizer({ filename: 'stats.html', open: false }) : undefined,
        ],
        resolve: {
            alias: {
                ...resolveAlias(),
                vue: 'vue/dist/vue.esm-bundler.js',
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        },
        esbuild: {
            target: 'esnext', // Target modern browsers that support ES Modules
            treeShaking: true, // Remove unnecessary code
            legalComments: 'none', // Remove comments
            format: 'esm',
        },
        build: {
            outDir: 'dist', // Output directory
            target: 'esnext', // Target modern browsers
            minify: 'esbuild', // Enable minification
            sourcemap: false, // Generate sourcemaps (optional, disable for smaller builds)
            chunkSizeWarningLimit: 500, // Set maximum chunk size (in bytes)
            assetsInlineLimit: 4096,
            cssCodeSplit: true, // Enable CSS code splitting
            commonjsOptions: {
                transformMixedEsModules: true, // Enable tree-shaking
            },
            rollupOptions: {
                output: {
                    minifyInternalExports: true, // Minify output
                    compact: true, // Compact output
                },
            },
        },
        server: {
            host: config.host,
            port: config.port,
            open: config.isDevMode,
        },
        optimizeDeps: {
            esbuildOptions: { target: 'esnext', treeShaking: true },
        },
    });
};
