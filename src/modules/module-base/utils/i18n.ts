/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { createI18n } from 'vue-i18n';

/** constants */
import { LocaleObject } from '@module-base/constants/LocaleObject';

/** utils */
import { getDeviceLanguage } from '@module-base/utils/getDeviceLanguage';

/** lang default */
import { en } from '@src/langs/en';

const messagesCache = { en } as Record<App.ModuleBase.Data.Locale, App.ModuleBase.Data.Messages>;

const defaultLocale = getDeviceLanguage();

export const i18n = createI18n({
    legacy: false,
    locale: LocaleObject.en as string,
    globalInjection: true,
    fallbackLocale: LocaleObject.en,
    availableLocales: Object.values(LocaleObject),
    messages: messagesCache,
    escapeParameterHtml: true,
    warnHtmlMessage: false,
});

export async function getMessages(locale: App.ModuleBase.Data.Locale): Promise<void> {
    const updateMessage = (data: App.ModuleBase.Data.Messages) => {
        i18n.global.setLocaleMessage(locale, data);
        i18n.global.locale.value = locale;
        document.querySelector('html')?.setAttribute('lang', locale);
        messagesCache[locale] = data;
    };

    if (messagesCache[locale]) {
        return updateMessage(messagesCache[locale]);
    }
    import(`@langs/${locale}.ts`).then((messages) => {
        if (messages && messages[locale]) {
            return updateMessage(messages[locale]);
        }
    });
}

if (!messagesCache[defaultLocale]) {
    getMessages(defaultLocale).then();
}
