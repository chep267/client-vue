/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { localeObject } from '@module-language/constants/localeObject';

/** langs */
import { vi } from '@lang/vi';
import { en } from '@lang/en';

/** types */
import type { TypeLocale, TypeMessages } from '@module-language/types';

const messagesCache = {} as Record<TypeLocale, TypeMessages>;

async function loadMessages(locale: TypeLocale): Promise<TypeMessages> {
    let messages: TypeMessages;
    switch (locale) {
        case localeObject.vi:
            messages = vi;
            break;
        case localeObject.en:
        default:
            messages = en;
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
