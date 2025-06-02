/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/vue-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi';

/** constants */
import { AppNotifyColor } from '@module-base/constants/AppNotifyColor';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore';

/** types */
import type { AxiosError } from 'axios';
import type { UseMutationReturnType } from '@tanstack/vue-query';

export function useRegister(): UseMutationReturnType<
    App.ModuleAuth.Api.Register['Response'],
    AxiosError,
    App.ModuleAuth.Api.Register['Payload'],
    unknown
> {
    const notifyStore = useNotifyStore();

    return useMutation<App.ModuleAuth.Api.Register['Response'], AxiosError, App.ModuleAuth.Api.Register['Payload']>({
        mutationFn: authApi.register,
        onSuccess: () => {
            notifyStore.show({ color: AppNotifyColor.success, messageIntl: AuthLanguage.notify.register.success });
        },
        onError: (error) => {
            const code = Number(error.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= 400 && code < 500:
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
