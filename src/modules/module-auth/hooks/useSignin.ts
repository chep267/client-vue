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

/** utils */
import { debounce } from '@module-base/utils/debounce';

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
    const notifyStore = useNotifyStore();
    const { push } = useRouter();
    const authStore = useAuthStore();

    const SIGN_IN = useMutation<TypeApiAuth['Signin']['Response'], AxiosError, TypeApiAuth['Signin']['Payload']>({
        mutationFn: authApi.signin,
        onSuccess: async (response, data) => {
            await authStore.signin(response.data);
            await push('/');
            debounce(response.data.token.exp, () => SIGN_IN.mutate(data)).then();
        },
        onError: (error) => {
            const code = Number(error?.response?.status);
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

    return SIGN_IN;
}
