/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

type TypeCallApiDelay = { timer?: number };

export type TypeCallApiPayload<Data = unknown> = TypeCallApiDelay & Data;

export type TypeResponseApi<Data = unknown> = {
    message: string;
    status: number;
    data: Data;
};
