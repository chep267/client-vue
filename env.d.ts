/// <reference types="vite/client" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="node_modules/vue-i18n/dist/vue-i18n.d.ts" />

/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type { Composer } from 'vue-i18n';
import type { TypeLocale } from '@module-language/types';
import type { TypeTheme } from '@module-theme/types';

interface ImportMetaEnv {
    readonly VITE_APP_MODE: 'dev' | 'build';
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_API_HOST: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_HOST: string;
    readonly VITE_APP_PORT: string;
    readonly VITE_APP_HTTPS: 'true' | 'false';
    readonly VITE_APP_LOCALE: TypeLocale;
    readonly VITE_APP_THEME: TypeTheme;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module 'vue-router' {
    interface RouteMeta {
        isAdmin?: boolean;
        requiresAuth?: boolean;
        hasHeader?: boolean;
        hasFooter?: boolean;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: Composer['t'];
    }
}
