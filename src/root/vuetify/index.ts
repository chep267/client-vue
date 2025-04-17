/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { createVuetify } from 'vuetify';
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
import './vuetify.scss';

export const vueComponents = createVuetify({
    components: {
        ...components,
        ...labsComponents,
    },
    directives,
    theme: {
        defaultTheme: getDeviceTheme(),
        themes: {
            light: {},
            dark: {},
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
