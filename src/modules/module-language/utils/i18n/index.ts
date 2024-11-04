/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

/** constants */
import { localeObject } from '@module-language/constants/localeObject';

/** utils */
import { getDeviceLanguage } from './getDeviceLanguage';
import { getMessage } from './getMessage';

/** types */
import type { TypeLocale } from '@module-language/types';

export const defaultLocale = getDeviceLanguage();

export const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    globalInjection: true,
    fallbackLocale: localeObject.en,
    availableLocales: [localeObject.vi, localeObject.en],
    messages: {},
});

async function loadLocaleMessages(locale: TypeLocale) {
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
