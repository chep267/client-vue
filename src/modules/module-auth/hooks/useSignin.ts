/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi.ts';

/** utils */
import { debounce } from '@module-base/utils/debounce.ts';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore.ts';
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';

/** types */
import type { AxiosError } from 'axios';
import type { TypeApiAuth } from '@module-auth/models';

export function useSignin() {
    const notifyStore = useNotifyStore();
    const { push } = useRouter();
    const authStore = useAuthStore();

    const SIGN_IN = useMutation({
        mutationFn: authApi.signin,
        onSuccess: async (response: TypeApiAuth['Signin']['Response'], data) => {
            await authStore.signin(response.data);
            await push('/');
            debounce(response.data.token.exp, () => SIGN_IN.mutate(data)).then();
        },
        onError: (error: AxiosError) => {
            let messageIntl = '';
            const code = Number(error?.response?.status);

            switch (true) {
                case !code || code >= 500:
                    messageIntl = 'module.auth.notify.server.error';
                    break;
                case code >= 400:
                    messageIntl = 'module.auth.notify.signin.error';
                    break;
                default:
                    break;
            }
            notifyStore.show({ color: 'red', messageIntl });
        },
    });

    return SIGN_IN;
}
