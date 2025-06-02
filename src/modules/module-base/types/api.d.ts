/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

type TypeDelayApi = { timer?: number };

export type TypePayloadApi<Data = unknown> = TypeDelayApi & Data;

export type TypeResponseApi<Data = unknown> = {
    message: string;
    status: number;
    data: Data;
};
