/// <reference types="vite/client" />
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type { TypeLocale } from '@module-language/types';
import type { TypeTheme } from '@module-theme/types';

declare module '*.vue';

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
        // is optional
        isAdmin?: boolean;
        // must be declared by every route
        requiresAuth?: boolean;
        hasHeader?: boolean;
        hasFooter?: boolean;
    }
}
