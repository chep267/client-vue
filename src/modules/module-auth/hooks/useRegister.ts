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

/** utils */
import { isCallApiErrorByClient } from '@module-base/utils/isClientCallApiError';

/** stores */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';

/** services */
import { authService } from '@module-auth/services';

/** types */
import type { AxiosError } from 'axios';

export function useRegister() {
    const notifyStore = useNotifyStore();

    return useMutation({
        mutationFn: authService.register,
        onSuccess: () => {
            notifyStore.show({ color: AppNotifyColor.success, messageIntl: AuthLanguage.notify.register.success });
        },
        onError: (error: AxiosError) => {
            let messageIntl: string;
            switch (true) {
                case isCallApiErrorByClient(error):
                    messageIntl = AuthLanguage.notify.register.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            notifyStore.show({ color: AppNotifyColor.error, messageIntl });
        },
    });
}
