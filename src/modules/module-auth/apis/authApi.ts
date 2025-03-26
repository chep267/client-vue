/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** apis */
import { baseApi } from '@module-base/apis/baseApi';

/** constants */
import { ApiMethod } from '@module-base/constants/Status';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthApiPath } from '@module-auth/constants/AuthApiPath';

/** utils */
import { delay } from '@module-base/utils/delay';

/** types */
import type { TypeApiAuth } from '@module-auth/types';

const apiSignin = async (payload: TypeApiAuth['Signin']['Payload']): Promise<TypeApiAuth['Signin']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Signin']['Response']>({
            method: ApiMethod.post,
            url: AuthApiPath.signin,
            data: { email, password },
        });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

const apiSignOut = async (payload: TypeApiAuth['SignOut']['Payload']): Promise<TypeApiAuth['SignOut']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => {
        return baseApi<Promise<TypeApiAuth['SignOut']['Response']>>({ method: ApiMethod.post, url: AuthApiPath.signOut });
    };
    await Promise.all([callApi(), delay(timer)]);
};

const apiRestart = async (payload: TypeApiAuth['Restart']['Payload']): Promise<TypeApiAuth['Restart']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Restart']['Response']>({ method: ApiMethod.post, url: AuthApiPath.restart });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

const apiRegister = async (payload: TypeApiAuth['Register']['Payload']): Promise<TypeApiAuth['Register']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Register']['Response']>({
            method: ApiMethod.post,
            url: AuthApiPath.register,
            data: { email, password },
        });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

const apiRecover = async (payload: TypeApiAuth['Recover']['Payload']): Promise<TypeApiAuth['Recover']['Response']> => {
    const { timer = AppTimer.pendingApi, email } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Recover']['Response']>({
            method: ApiMethod.post,
            url: AuthApiPath.recover,
            data: { email },
        });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

export const authApi = {
    signin: apiSignin,
    signOut: apiSignOut,
    restart: apiRestart,
    register: apiRegister,
    recover: apiRecover,
} as const;
