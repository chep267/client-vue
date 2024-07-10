/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import axios from 'axios';
import Cookies from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';
import { AppEnv } from '@module-base/constants/AppEnv.ts';
import { AppTimer } from '@module-base/constants/AppTimer.ts';

/** utils */
import { debounce } from '@module-base/utils/debounce.ts';

/** types */
import type { AxiosError, AxiosResponse, AxiosRequestConfig, CreateAxiosDefaults } from '@module-base/types';

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
    (error) => Promise.reject(error)
);

/** Add a response interceptor */
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return {
            ...response.data,
            status: response.status,
        };
    },
    async (error: AxiosError) => {
        /** khoan, dừng khoảng chừng là 600ms */
        await debounce(AppTimer.pendingApi);
        if (error.response?.status === 401) {
            Cookies.remove(AppKey.uid);
        }
        return Promise.reject(error);
    }
);

export const baseApi = async <Res>(options: AxiosRequestConfig, isCDN?: boolean) => {
    const client = isCDN ? axiosClientCDN : axiosClient;
    return client<any, Res, any>(options);
};
