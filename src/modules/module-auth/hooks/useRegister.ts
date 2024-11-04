/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { useMutation } from '@tanstack/vue-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi';

/** constants */
import { NotifyColor } from '@module-base/constants/NotifyColor';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore';

/** types */
import type { AxiosError } from '@module-base/types';

export function useRegister() {
    const notifyStore = useNotifyStore();

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            notifyStore.show({ color: NotifyColor.success, messageIntl: AuthLanguage.notify.register.success });
        },
        onError: (error: AxiosError) => {
            const code = Number(error?.response?.status);
            let messageIntl;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.register.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            notifyStore.show({ color: NotifyColor.error, messageIntl });
        },
    });
}
