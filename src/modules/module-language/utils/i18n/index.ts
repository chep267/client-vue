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
import { getDeviceLanguage } from '@module-language/utils/i18n/getDeviceLanguage';

/** lang default */
import { en } from '@lang/en';

/** types */
import type { TypeLocale, TypeMessages } from '@module-language/types';

const messagesCache = { en } as Record<TypeLocale, TypeMessages>;

export const defaultLocale = getDeviceLanguage();

export const i18n = createI18n({
    legacy: false,
    locale: localeObject.en as string,
    globalInjection: true,
    fallbackLocale: localeObject.en,
    availableLocales: Object.values(localeObject),
    messages: messagesCache,
});

export async function getMessages(locale: TypeLocale): Promise<void> {
    if (messagesCache[locale]) {
        i18n.global.setLocaleMessage(locale, messagesCache[locale]);
        i18n.global.locale.value = locale;
        document.querySelector('html')?.setAttribute('lang', locale);
        return nextTick();
    }
    const messages = await import(`@lang/${locale}.ts`);
    if (messages && messages[locale]) {
        i18n.global.setLocaleMessage(locale, messages[locale]);
        i18n.global.locale.value = locale;
        document.querySelector('html')?.setAttribute('lang', locale);
        messagesCache[locale] = messages[locale];
    }
    return nextTick();
}

if (defaultLocale !== localeObject.en) {
    getMessages(defaultLocale).then();
}
