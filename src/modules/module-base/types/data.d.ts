/**
 *
 * @author dongntd267@gmail.com
 *
 */

export type TypeItemIds = string[];

export type TypeItems<T> = Record<string, T>;

export type TypeStorageName = 'localStorage' | 'sessionStorage';

export type TypeStoreValue = string | null;

export type TypeTheme = 'dark' | 'light';

export type TypeLocale = 'vi' | 'en';

export type TypeMessages = Record<string, string>;
