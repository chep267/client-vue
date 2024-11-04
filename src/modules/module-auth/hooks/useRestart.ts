/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import { useCookies } from '@vueuse/integrations/useCookies';

/** apis */
import { authApi } from '@module-auth/apis/authApi';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { NotifyColor } from '@module-base/constants/NotifyColor';
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { debounce } from '@module-base/utils/debounce';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore';
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

/** types */
import type { AxiosError } from 'axios';
import type { TypeApiAuth } from '@module-auth/types';

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
            cookies.remove(AppKey.uid);
            const code = Number(error?.response?.status);
            let messageIntl;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.refresh.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            notifyStore.show({ color: NotifyColor.error, messageIntl });
            await push(AuthScreenPath.signin);
        },
    });

    return RESTART;
}
