/** libs */
import Cookies from 'js-cookie';

/** constants */
import { AppEnv } from '@module-base/constants/AppEnv';
import { AppKey } from '@module-base/constants/AppKey';
import { themeObject } from '@module-theme/constants/themeObject';

/** types */
import type { TypeTheme } from '@module-theme/types';

export const getDeviceTheme = (): TypeTheme => {
    // get from cookie
    let theme = Cookies.get(AppKey.theme) as TypeTheme;
    if (theme in themeObject) {
        return theme;
    }
    // get from env
    theme = AppEnv.appTheme;
    if (theme in themeObject) {
        return theme;
    }
    // get from device
    if (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) {
        return themeObject.dark;
    }
    return themeObject.light;
};
