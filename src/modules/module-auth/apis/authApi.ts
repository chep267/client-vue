/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** apis */
import { baseApi } from '@module-base/apis/baseApi';

/** constants */
import { ApiMethod } from '@module-base/constants/AppStatus';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthApiPath } from '@module-auth/constants/AuthApiPath';

/** utils */
import { delay } from '@module-base/utils/delay';

const apiSignin = async (payload: App.ModuleAuth.Apis.Signin['Payload']): Promise<App.ModuleAuth.Apis.Signin['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const callApi = () => {
        return baseApi<App.ModuleAuth.Apis.Signin['Response']>({
            method: ApiMethod.post,
            url: AuthApiPath.signin,
            data: { email, password },
        });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

const apiSignOut = async (
    payload: App.ModuleAuth.Apis.SignOut['Payload']
): Promise<App.ModuleAuth.Apis.SignOut['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => {
        return baseApi<App.ModuleAuth.Apis.SignOut['Response']>({ method: ApiMethod.post, url: AuthApiPath.signOut });
    };
    await Promise.all([callApi(), delay(timer)]);
};

const apiRestart = async (
    payload: App.ModuleAuth.Apis.Restart['Payload']
): Promise<App.ModuleAuth.Apis.Restart['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => {
        return baseApi<App.ModuleAuth.Apis.Restart['Response']>({ method: ApiMethod.post, url: AuthApiPath.restart });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

const apiRegister = async (
    payload: App.ModuleAuth.Apis.Register['Payload']
): Promise<App.ModuleAuth.Apis.Register['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const callApi = () => {
        return baseApi<App.ModuleAuth.Apis.Register['Response']>({
            method: ApiMethod.post,
            url: AuthApiPath.register,
            data: { email, password },
        });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

const apiRecover = async (
    payload: App.ModuleAuth.Apis.Recover['Payload']
): Promise<App.ModuleAuth.Apis.Recover['Response']> => {
    const { timer = AppTimer.pendingApi, email } = payload;
    const callApi = () => {
        return baseApi<App.ModuleAuth.Apis.Recover['Response']>({
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
