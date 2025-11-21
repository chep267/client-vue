/**
 *
 * @author dongntd267@gmail.com
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
import type { AxiosError } from 'axios';

/** default api */
export const axiosClient = axios.create({
    baseURL: AppEnv.apiHost,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        lang: 'en',
    },
    timeout: AppTimer.timeoutApi,
    withCredentials: true,
});

/** request interceptor */
axiosClient.interceptors.request.use(
    (config) => config,
    (error: AxiosError) => Promise.reject(error)
);

/** response interceptor */
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        if (error.response?.status === axios.HttpStatusCode.Unauthorized) {
            Cookies.remove(AppKey.uid);
        }
        /** khoan, dừng khoảng chừng là 600ms */
        await delay(AppTimer.pendingApi);
        return Promise.reject(error);
    }
);
