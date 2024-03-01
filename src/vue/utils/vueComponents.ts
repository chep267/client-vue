/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';
import { useCookies } from '@vueuse/integrations/useCookies';

/** icons */
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { customSVGs } from '@module-base/icons';

/** messages */
import { en, vi } from 'vuetify/locale';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import { defaultLocale, i18n } from '@module-language/utils/i18n.ts';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';

/** styles */
import 'vuetify/styles';

const cookies = useCookies();

export const vueComponents = createVuetify({
    directives,
    theme: {
        defaultTheme: cookies.get(AppKey.theme) || 'dark',
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
        fallback: 'en',
        messages: { en, vi },
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
});
