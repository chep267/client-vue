/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** apis */
import { axiosClient } from '@module-base/apis/baseApi';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

/** utils */
import { delay as funcDelay } from '@module-base/utils/delay';

/** types */
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

export class BaseServices {
    protected readonly url: string;
    protected readonly delay: number;

    constructor(url = '', delay: number = AppTimer.pendingApi) {
        this.url = url;
        this.delay = delay;
    }

    private concatUrl = (url: string = '') => {
        return this.url + url;
    };

    public withDelay = async <Data = any>(promise: Promise<Data>, delay = this.delay): Promise<Data> => {
        const [res] = await Promise.all([promise, funcDelay(delay)]);
        return res;
    };

    public get = async <Data = any>(configs?: AxiosRequestConfig) => {
        return axiosClient.get<Data, AxiosResponse<Data>>(this.concatUrl(configs?.url), configs);
    };

    public post = <Data = any, Body = any>(data: Body, configs?: AxiosRequestConfig): Promise<AxiosResponse<Data>> => {
        return axiosClient.post<Data, AxiosResponse<Data>, Body>(this.concatUrl(configs?.url), data, configs);
    };

    public put = <Data = any, Body = any>(data: Body, configs?: AxiosRequestConfig): Promise<AxiosResponse<Data>> => {
        return axiosClient.put<Data, AxiosResponse<Data>, Body>(this.concatUrl(configs?.url), data, configs);
    };

    public patch = <Data = any, Body = any>(data: Body, configs?: AxiosRequestConfig): Promise<AxiosResponse<Data>> => {
        return axiosClient.patch<Data, AxiosResponse<Data>, Body>(this.concatUrl(configs?.url), data, configs);
    };

    public delete = (configs?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return axiosClient.delete(this.concatUrl(configs?.url), configs);
    };
}
