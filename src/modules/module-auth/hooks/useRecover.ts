/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { useMutation } from '@tanstack/vue-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi.ts';

/** constants */
import { NotifyColor } from '@module-base/constants/NotifyColor.ts';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage.ts';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore.ts';

/** types */
import type { AxiosError } from '@module-base/types';

export function useRecover() {
    const notifyStore = useNotifyStore();

    return useMutation({
        mutationFn: authApi.recover,
        onSuccess: () => {
            notifyStore.show({ color: NotifyColor.success, messageIntl: AuthLanguage.notify.recover.success });
        },
        onError: (error: AxiosError) => {
            const code = Number(error?.response?.status);
            let messageIntl;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.recover.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            notifyStore.show({ color: NotifyColor.error, messageIntl });
        },
    });
}
