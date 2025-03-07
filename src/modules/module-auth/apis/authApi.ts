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
import { ApiMethod } from '@module-base/constants/Status';

/** utils */
import { delay } from '@module-base/utils/delay';

/** types */
import type { TypeApiAuth } from '@module-auth/types';

const apiSignin = async (payload: TypeApiAuth['Signin']['Payload']): Promise<TypeApiAuth['Signin']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Signin']['Response']>({
            method: ApiMethod.post,
            url: AuthApi.signin,
            data: { email, password },
        });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

const apiSignout = async (payload: TypeApiAuth['Signout']['Payload']): Promise<TypeApiAuth['Signout']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => baseApi({ method: ApiMethod.post, url: AuthApi.signout });
    await Promise.all([callApi(), delay(timer)]);
};

const apiRestart = async (payload: TypeApiAuth['Restart']['Payload']): Promise<TypeApiAuth['Restart']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Restart']['Response']>({ method: ApiMethod.post, url: AuthApi.restart });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

const apiRegister = async (payload: TypeApiAuth['Register']['Payload']): Promise<TypeApiAuth['Register']['Response']> => {
    const { timer = AppTimer.pendingApi, ...data } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Register']['Response']>({
            method: ApiMethod.post,
            url: AuthApi.register,
            data,
        });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

const apiRecover = async (payload: TypeApiAuth['Recover']['Payload']): Promise<TypeApiAuth['Recover']['Response']> => {
    const { timer = AppTimer.pendingApi, ...data } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Recover']['Response']>({
            method: ApiMethod.post,
            url: AuthApi.recover,
            data,
        });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

export const authApi = {
    signin: apiSignin,
    signout: apiSignout,
    restart: apiRestart,
    register: apiRegister,
    recover: apiRecover,
};
