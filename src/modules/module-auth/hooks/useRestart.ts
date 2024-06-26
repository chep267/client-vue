/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import { useCookies } from '@vueuse/integrations/useCookies';

/** apis */
import { authApi } from '@module-auth/apis/authApi.ts';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath.ts';

/** utils */
import { debounce } from '@module-base/utils/debounce.ts';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore.ts';
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';

/** types */
import type { AxiosError } from 'axios';
import type { TypeApiAuth } from '@module-auth/models';

export function useRestart() {
    const notifyStore = useNotifyStore();
    const { push } = useRouter();
    const authStore = useAuthStore();
    const cookies = useCookies();

    const RESTART = useMutation({
        mutationFn: authApi.restart,
        onSuccess: async (response: TypeApiAuth['Restart']['Response']) => {
            await authStore.signin(response.data);
            await push(authStore.prePath);
            await debounce(response.data.token.exp, () => RESTART.mutate({}));
        },
        onError: async (error: AxiosError) => {
            let messageIntl = '';
            const code = Number(error?.response?.status);
            cookies.remove(AppKey.uid);
            switch (true) {
                case !code || code >= 500:
                    messageIntl = 'module.auth.notify.server.error';
                    break;
                case code >= 400:
                    messageIntl = 'module.auth.notify.refresh.error';
                    break;
                default:
                    break;
            }
            notifyStore.show({ color: 'red', messageIntl });
            await push(AuthScreenPath.signin);
        },
    });

    return RESTART;
}
