/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import Cookies from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AppNotifyColor } from '@module-base/constants/AppNotifyColor';
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { delay } from '@module-base/utils/delay';
import { isCallApiErrorByClient } from '@module-base/utils/isClientCallApiError';

/** stores */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** services */
import { authService } from '@module-auth/services';

/** types */
import type { AxiosError } from 'axios';

export function useRestart() {
    const { push } = useRouter();
    const notifyStore = useNotifyStore();
    const authStore = useAuthStore();
    const uid = Cookies.get(AppKey.uid) || '';

    const hookRestart = useMutation({
        mutationFn: () => authService.restart({ uid }),
        onSuccess: (response) => {
            const exp = !isNaN(response.data.token.exp) ? response.data.token.exp : AppTimer.restart;
            authStore.signin(response.data);
            push(authStore.prePath).then(() => delay(exp - 3000 * 60, () => hookRestart.mutate()));
        },
        onError: (error: AxiosError) => {
            Cookies.remove(AppKey.uid);
            let messageIntl: string;
            switch (true) {
                case isCallApiErrorByClient(error):
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
