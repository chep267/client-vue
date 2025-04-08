/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

export declare type TypeCallApiDelay = { timer?: number };

export declare type TypeCallApiPayload<Data = unknown> = TypeCallApiDelay & Data;

export declare type TypeResponseApi<Data = unknown> = {
    message: string;
    status: number;
    data: Data;
};
