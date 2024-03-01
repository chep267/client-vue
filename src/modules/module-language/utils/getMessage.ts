/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TypeLocale, TypeMessages } from '@module-language/models';

const messagesCache = {} as Record<TypeLocale, TypeMessages>;

async function loadMessages(locale: TypeLocale): Promise<TypeMessages> {
    // dynamic import syntax tells webpack to split this module into its own chunk
    let module, messages;
    switch (locale) {
        case 'vi':
            module = await import(/* @vite-ignore */ `@lang/vi.ts`);
            messages = module.vi;
            break;
        default:
            module = await import(/* @vite-ignore */ `@lang/en.ts`);
            messages = module.en;
            break;
    }
    messagesCache[locale] = messages;
    return messages;
}

export function getMessage(locale: TypeLocale): Promise<TypeMessages> {
    if (messagesCache[locale]) {
        return Promise.resolve(messagesCache[locale]);
    }
    return loadMessages(locale);
}
