/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';
import { useCookies } from '@vueuse/integrations/useCookies';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';

/** utils */
import { getDeviceLanguage } from './getDeviceLanguage.ts';
import { getMessage } from './getMessage.ts';

/** types */
import type { TypeLocale } from '@module-language/models';

const cookies = useCookies();

export const defaultLocale = cookies.get(AppKey.locale) || getDeviceLanguage() || 'en';

export const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: 'en', // set fallback locale
    messages: undefined, // set locale messages
});

async function loadLocaleMessages(locale: TypeLocale) {
    // load locale messages with dynamic import
    const messages = await getMessage(locale);
    i18n.global.setLocaleMessage(locale, messages);
    return nextTick();
}

export async function setI18nLanguage(locale: TypeLocale) {
    await loadLocaleMessages(locale);
    i18n.global.locale.value = locale;
    document.querySelector('html')?.setAttribute('lang', locale);
}
await setI18nLanguage(defaultLocale);
