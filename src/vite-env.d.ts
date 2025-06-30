/// <reference types="vite/client" />

/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { Composer } from 'vue-i18n';

interface ImportMetaEnv {
    readonly VITE_APP_MODE: 'dev' | 'prod';
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_API_HOST: string;
    readonly VITE_APP_CLIENT_HOST: string;
    readonly VITE_APP_CLIENT_PORT: string;
    readonly VITE_APP_CLIENT_LOCALE: App.ModuleBase.Data.Locale;
    readonly VITE_APP_CLIENT_THEME: App.ModuleBase.Data.Theme;
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

declare global {
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}
