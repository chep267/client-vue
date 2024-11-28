/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi';

/** constants */
import { NotifyColor } from '@module-base/constants/NotifyColor';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore';
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

/** types */
import type { AxiosError } from 'axios';
import type { UseMutationReturnType } from '@tanstack/vue-query';
import type { TypeApiAuth } from '@module-auth/types';

export function useSignin(): UseMutationReturnType<
    TypeApiAuth['Restart']['Response'],
    AxiosError,
    TypeApiAuth['Signin']['Payload'],
    unknown
> {
    const { push } = useRouter();
    const notifyStore = useNotifyStore();
    const authStore = useAuthStore();

    return useMutation<TypeApiAuth['Signin']['Response'], AxiosError, TypeApiAuth['Signin']['Payload']>({
        mutationFn: authApi.signin,
        onSuccess: (response) => {
            authStore.signin(response.data);
            push('/').then();
        },
        onError: (error) => {
            const code = Number(error.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.signin.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            notifyStore.show({ color: NotifyColor.error, messageIntl });
        },
    });
}
