/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import axios from 'axios';
import Cookies from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppEnv } from '@module-base/constants/AppEnv';
import { AppTimer } from '@module-base/constants/AppTimer';

/** utils */
import { delay } from '@module-base/utils/delay';

/** types */
import type { AxiosError, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

/** for default api */
const axiosDefaultConfig: CreateAxiosDefaults = {
    baseURL: AppEnv.apiHost,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        lang: 'en',
    },
    timeout: AppTimer.timeoutApi,
    withCredentials: true,
};
const axiosClient = axios.create(axiosDefaultConfig);

/** for file api */
const axiosDefaultFormDataConfig = {
    baseURL: AppEnv.apiHost,
    headers: { 'Content-Type': 'multipart/form-data' },
};
const axiosClientCDN = axios.create(axiosDefaultFormDataConfig);

/** Add a request interceptor */
axiosClient.interceptors.request.use(
    (config) => config,
    (error: AxiosError) => Promise.reject(error)
);

/** Add a response interceptor */
axiosClient.interceptors.response.use(
    (response) =>
        Promise.resolve({
            ...response.data,
            status: response.status,
        }),
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            Cookies.remove(AppKey.uid);
        }
        /** khoan, dừng khoảng chừng là 600ms */
        await delay(AppTimer.pendingApi);
        return Promise.reject(error);
    }
);

export const baseApi = async <Res>(options: AxiosRequestConfig, isCDN?: boolean) => {
    const client = isCDN ? axiosClientCDN : axiosClient;
    return client<any, Res, any>(options);
};
