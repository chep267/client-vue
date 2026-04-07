/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';
import * as components from 'vuetify/components';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import { en, vi } from 'vuetify/locale';

/** icons */
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { customSVGs } from '@module-base/icons';

/** constants */
import { LocaleObject } from '@module-base/constants/LocaleObject';

/** utils */
import { i18n } from '@module-base/utils/i18n';
import { getDeviceTheme } from '@module-base/utils/getDeviceTheme';
import { getDeviceLanguage } from '@module-base/utils/getDeviceLanguage';

/** styles */
import '@src/styles/layers.css';
import '@src/styles/tailwind.css';
import 'vuetify/styles';

export const vuetify = createVuetify({
    components,
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
        locale: getDeviceLanguage(),
        fallback: LocaleObject.en,
        messages: { en, vi },
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
});
