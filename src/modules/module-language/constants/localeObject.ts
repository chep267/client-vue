/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type { TypeLocale } from '@module-language/types';

export const localeObject: Readonly<{ [Key in TypeLocale]: Key }> = {
    vi: 'vi',
    en: 'en',
};
