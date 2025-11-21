/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/vue-query';

/** constants */
import { AppNotifyColor } from '@module-base/constants/AppNotifyColor';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** stores */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';

/** services */
import { authService } from '@module-auth/services';

/** types */
import type { AxiosError } from 'axios';

export function useRecover() {
    const notifyStore = useNotifyStore();

    return useMutation({
        mutationFn: authService.recover,
        onSuccess: () => {
            notifyStore.show({ color: AppNotifyColor.success, messageIntl: AuthLanguage.notify.recover.success });
        },
        onError: (error: AxiosError) => {
            const code = Number(error.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.recover.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            notifyStore.show({ color: AppNotifyColor.error, messageIntl });
        },
    });
}
