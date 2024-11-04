/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type { TypeLocale } from '@module-language/types';

export const localeObject: Readonly<Record<TypeLocale, TypeLocale>> = {
    vi: 'vi',
    en: 'en',
} as const;
