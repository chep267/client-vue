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

type TypeMessageModule = Record<App.ModuleBase.Data.Locale, App.ModuleBase.Data.Messages>;

const localeLoaders = import.meta.glob<TypeMessageModule>('/src/langs/*.ts', { eager: false });
const messagesCache = { en } as TypeMessageModule;
const pendingPromises = {} as Record<App.ModuleBase.Data.Locale, Promise<App.ModuleBase.Data.Messages> | undefined>;

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

export async function getMessage(locale: App.ModuleBase.Data.Locale): Promise<any> {
    const updateMessage = (data: App.ModuleBase.Data.Messages) => {
        i18n.global.setLocaleMessage(locale, data);
        i18n.global.locale.value = locale;
        document.querySelector('html')?.setAttribute('lang', locale);
        messagesCache[locale] = data;
    };

    if (messagesCache[locale]) {
        return updateMessage(messagesCache[locale]);
    }
    if (pendingPromises[locale]) {
        const messages = await pendingPromises[locale];
        return updateMessage(messages);
    }

    const loaderPath = `/src/langs/${locale}.ts`;
    const loader = localeLoaders[loaderPath];
    if (!loader) {
        console.warn(`Loader not found for locale: "${locale}". Falling back to "${defaultLocale}".`);
        return getMessage(defaultLocale);
    }

    pendingPromises[locale] = (async () => {
        try {
            const messages = await loader();
            if (messages?.[locale]) {
                messagesCache[locale] = messages[locale];
                return updateMessage(messagesCache[locale]);
            }
            return getMessage(defaultLocale);
        } catch (error) {
            console.error(`Failed to load locale ${locale} due to network or file error:`, error);
            return getMessage(defaultLocale);
        } finally {
            pendingPromises[locale] = undefined;
        }
    })();
}

if (!messagesCache[defaultLocale]) {
    getMessage(defaultLocale).then();
}
