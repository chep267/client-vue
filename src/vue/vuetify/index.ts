/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { createVuetify } from 'vuetify';
import colors from 'vuetify/util/colors';
import * as directives from 'vuetify/directives';
import * as components from 'vuetify/components';
import * as labsComponents from 'vuetify/labs/components';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import { en, vi } from 'vuetify/locale';

/** icons */
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { customSVGs } from '@module-base/icons';

/** constants */
import { localeObject } from '@module-language/constants/localeObject';

/** utils */
import { defaultLocale, i18n } from '@module-language/utils/i18n';
import { getDeviceTheme } from '@module-theme/utils/defaultTheme';

/** styles */
import 'vuetify/styles/main.sass';

export const vueComponents = createVuetify({
    components: {
        ...components,
        ...labsComponents,
    },
    directives,
    theme: {
        defaultTheme: getDeviceTheme(),
        themes: {
            light: {
                colors: {
                    // error: '#C10000',
                    // main: '#0351BF',
                    start: colors.blue.base,
                    'auth-title': colors.blue.base,
                },
            },
            dark: {
                colors: {
                    // error: '#C10000',
                    // main: '#0351BF',
                    start: colors.amber.base,
                    'auth-title': colors.shades.white,
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
            flag: customSVGs,
        },
    },
    locale: {
        locale: defaultLocale,
        fallback: localeObject.en,
        messages: { en, vi },
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
});
