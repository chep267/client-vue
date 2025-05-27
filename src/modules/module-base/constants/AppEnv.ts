/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

export const AppEnv = {
    appName: import.meta.env.VITE_APP_NAME,
    apiHost: import.meta.env.VITE_APP_API_HOST,
    appTheme: import.meta.env.VITE_APP_CLIENT_THEME,
    appLocale: import.meta.env.VITE_APP_CLIENT_LOCALE,
} as const;
