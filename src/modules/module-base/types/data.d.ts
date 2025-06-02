/**
 *
 * @author dongntd267@gmail.com
 *
 */

export type TypeItemIds = string[];

export type TypeItems<T> = Record<string, T>;

export type TypeStorageName = 'localStorage' | 'sessionStorage';

export type TypeStoreValue = string | null;
