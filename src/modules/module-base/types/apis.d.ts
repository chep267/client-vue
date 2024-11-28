/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

export type TypeCallApiDebounce = { timer?: number };

export type TypeCallApiPayload<Data = unknown> = TypeCallApiDebounce & Data;

export type TypeResponseApi<Data = unknown> = {
    message: string;
    status: string | number;
    data: Data;
};
