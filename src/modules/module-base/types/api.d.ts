/**
 *
 * @author dongntd267@gmail.com
 *
 */

type TypeDelayApi = { timer?: number };

export type TypePayloadApi<Data = unknown> = TypeDelayApi & Data;

export type TypeResponseApi<Data = unknown> = {
    message: string;
    status: number;
    data: Data;
};
