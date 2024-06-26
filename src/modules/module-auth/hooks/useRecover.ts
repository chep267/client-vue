/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { useMutation } from '@tanstack/vue-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi.ts';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore.ts';

/** types */
import type { AxiosError } from '@module-base/models';

export function useRecover() {
    const notifyStore = useNotifyStore();

    return useMutation({
        mutationFn: authApi.recover,
        onSuccess: () => {
            notifyStore.show({ color: 'success', messageIntl: 'module.auth.notify.recover.success' });
        },
        onError: (error: AxiosError) => {
            let messageIntl = '';
            const code = Number(error?.response?.status);

            switch (true) {
                case !code || code >= 500:
                    messageIntl = 'module.auth.notify.server.error';
                    break;
                case code >= 400:
                    messageIntl = 'module.auth.notify.recover.error';
                    break;
                default:
                    break;
            }
            notifyStore.show({ color: 'red', messageIntl });
        },
    });
}
