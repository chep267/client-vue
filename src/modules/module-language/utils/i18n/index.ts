/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { createI18n } from 'vue-i18n';

/** constants */
import { localeObject } from '@module-language/constants/localeObject';

/** utils */
import { getDeviceLanguage } from '@module-language/utils/i18n/getDeviceLanguage';

/** lang default */
import { en } from '@lang/en';

const messagesCache = { en } as Record<App.ModuleLanguage.Data.Locale, App.ModuleLanguage.Data.Messages>;

export const defaultLocale = getDeviceLanguage();

export const i18n = createI18n({
    legacy: false,
    locale: localeObject.en as string,
    globalInjection: true,
    fallbackLocale: localeObject.en,
    availableLocales: Object.values(localeObject),
    messages: messagesCache,
    escapeParameterHtml: true,
    warnHtmlMessage: false,
});

export async function getMessages(locale: App.ModuleLanguage.Data.Locale): Promise<void> {
    const updateMessage = (data: App.ModuleLanguage.Data.Messages) => {
        i18n.global.setLocaleMessage(locale, data);
        i18n.global.locale.value = locale;
        document.querySelector('html')?.setAttribute('lang', locale);
        messagesCache[locale] = data;
    };

    if (messagesCache[locale]) {
        return updateMessage(messagesCache[locale]);
    }
    import(`@lang/${locale}.ts`).then((messages) => {
        if (messages && messages[locale]) {
            return updateMessage(messages[locale]);
        }
    });
}

if (defaultLocale !== localeObject.en) {
    getMessages(defaultLocale).then();
}
