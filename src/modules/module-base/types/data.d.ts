/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

export type TypeItemIds = string[];

export type TypeItems<T> = Record<string, T>;

export type StorageName = 'localStorage' | 'sessionStorage';

export type StoreValueType = string | null;
