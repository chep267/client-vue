/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

/** config */
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig({ mode: 'test', command: 'build' }),
    defineConfig({
        plugins: [tsconfigPaths()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./test/vitest.setup.ts'],
            alias: { '@/': new URL('./src', import.meta.url).pathname },
            server: {
                deps: {
                    inline: ['vuetify'],
                },
            },
        },
    })
);
