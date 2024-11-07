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
import { useCookies } from '@vueuse/integrations/useCookies';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import { en, vi } from 'vuetify/locale';

/** icons */
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { customSVGs } from '@module-base/icons';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { localeObject } from '@module-language/constants/localeObject';
import { themeObject } from '@module-theme/constants/themeObject';

/** utils */
import { defaultLocale, i18n } from '@module-language/utils/i18n';

/** styles */
import 'vuetify/styles';

const cookies = useCookies();

export const vueComponents = createVuetify({
    components: {
        ...components,
        ...labsComponents,
    },
    directives,
    theme: {
        defaultTheme: cookies.get(AppKey.theme) || themeObject.dark,
        themes: {
            light: {
                variables: {
                    'form-title-color': colors.blue.base,
                    'start-loading-color': colors.blue.base,
                },
            },
            dark: {
                variables: {
                    'form-title-color': colors.shades.white,
                    'start-loading-color': colors.amber.base,
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
