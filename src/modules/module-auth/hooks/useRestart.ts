/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import Cookie from 'js-cookie';

/** apis */
import { authApi } from '@module-auth/apis/authApi';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AppNotifyColor } from '@module-base/constants/AppNotifyColor';
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { delay } from '@module-base/utils/delay';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore';
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

/** types */
import type { AxiosError } from 'axios';
import type { UseMutationReturnType } from '@tanstack/vue-query';
import type { TypeApiAuth } from '@module-auth/types';

export function useRestart(): UseMutationReturnType<
    TypeApiAuth['Restart']['Response'],
    AxiosError,
    TypeApiAuth['Restart']['Payload'],
    unknown
> {
    const { push } = useRouter();
    const notifyStore = useNotifyStore();
    const authStore = useAuthStore();

    const hookRestart = useMutation<TypeApiAuth['Restart']['Response'], AxiosError, TypeApiAuth['Restart']['Payload']>({
        mutationFn: authApi.restart,
        onSuccess: (response: TypeApiAuth['Restart']['Response']) => {
            const exp = !isNaN(response.data.token.exp) ? response.data.token.exp : AppTimer.restart;
            authStore.signin(response.data);
            push(authStore.prePath).then(() => delay(exp - 3000 * 60, () => hookRestart.mutate({})));
        },
        onError: (error) => {
            Cookie.remove(AppKey.uid);
            const code = Number(error.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.refresh.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            notifyStore.show({ color: AppNotifyColor.error, messageIntl });
            push(AuthRouterPath.signin).then();
        },
    });

    return hookRestart;
}
