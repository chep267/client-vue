/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** apis */
import { baseApi } from '@module-base/apis/baseApi';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthApi } from '@module-auth/constants/AuthApi';

/** utils */
import { debounce } from '@module-base/utils/debounce';

/** types */
import type { TypeApiAuth } from '@module-auth/types';

const apiSignin = async (payload: TypeApiAuth['Signin']['Payload']): Promise<TypeApiAuth['Signin']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Signin']['Response']>({ method: 'post', url: AuthApi.signin, data: { email, password } });
    };
    const [res] = await Promise.all([callApi(), debounce(timer)]);
    return res;
};

const apiSignout = async (payload: TypeApiAuth['Signout']['Payload']): Promise<TypeApiAuth['Signout']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => baseApi({ method: 'post', url: AuthApi.signout });
    await Promise.all([callApi(), debounce(timer)]);
};

const apiRestart = async (payload: TypeApiAuth['Restart']['Payload']): Promise<TypeApiAuth['Restart']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Restart']['Response']>({ method: 'post', url: AuthApi.restart });
    };
    const [res] = await Promise.all([callApi(), debounce(timer)]);
    return res;
};

const apiRegister = async (payload: TypeApiAuth['Register']['Payload']): Promise<TypeApiAuth['Register']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Register']['Response']>({
            method: 'post',
            url: AuthApi.register,
            data: { email, password },
        });
    };
    const [res] = await Promise.all([callApi(), debounce(timer)]);
    return res;
};

const apiRecover = async (payload: TypeApiAuth['Recover']['Payload']): Promise<TypeApiAuth['Recover']['Response']> => {
    const { timer = AppTimer.pendingApi, email } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Recover']['Response']>({
            method: 'post',
            url: AuthApi.recover,
            data: { email },
        });
    };
    const [res] = await Promise.all([callApi(), debounce(timer)]);
    return res;
};

export const authApi = {
    signin: apiSignin,
    signout: apiSignout,
    restart: apiRestart,
    register: apiRegister,
    recover: apiRecover,
};
