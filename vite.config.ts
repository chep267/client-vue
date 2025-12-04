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
            pluginVue(),
            pluginBasicSsl(),
            pluginVuetify({ autoImport: false }),
            pluginTailwindcss(),
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
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        },
        esbuild: {
            target: 'esnext', // Target modern browsers that support ES Modules
            treeShaking: true, // Remove unnecessary code
            minifySyntax: true, // Minify syntax while preserving ES Modules
            legalComments: 'none', // Remove comments
            format: 'esm',
        },
        build: {
            outDir: 'dist', // Output directory
            target: 'esnext', // Target modern browsers
            minify: 'esbuild', // Enable minification
            sourcemap: false, // Generate sourcemaps (optional, disable for smaller builds)
            chunkSizeWarningLimit: 500, // Set the maximum chunk size (in bytes)
            assetsInlineLimit: 4096,
            cssCodeSplit: true, // Enable CSS code splitting
            commonjsOptions: {
                transformMixedEsModules: true, // Enable tree-shaking
            },
            rollupOptions: {
                output: {
                    minifyInternalExports: true, // Minify output
                    compact: true, // Compact output
                    manualChunks: {
                        'vite-chunks-vue-core': ['vue', 'vue-router', 'pinia', 'vue-i18n'],
                        'vite-chunks-vuetify-core': ['vuetify', 'vuetify/directives'],
                        'vite-chunks-vuetify-components': ['vuetify/components'],
                        'vite-chunks-lib-components': ['v-calendar'],
                        'vite-chunks-vendor': ['@vueuse/core', '@tanstack/vue-query', 'axios', 'dayjs', 'js-cookie'],
                        'vite-chunks-validation': ['vee-validate'],
                        'vite-chunks-icons': ['@mdi/js'],
                        'vite-chunks-particles': ['@tsparticles/vue3', '@tsparticles/slim'],
                    },
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
