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
import type { AxiosError } from 'axios';
import type { UseMutationReturnType } from '@tanstack/vue-query';
import type { TypeApiAuth } from '@module-auth/types';

export function useRecover(): UseMutationReturnType<
    TypeApiAuth['Recover']['Response'],
    AxiosError,
    TypeApiAuth['Recover']['Payload'],
    unknown
> {
    const notifyStore = useNotifyStore();

    return useMutation<TypeApiAuth['Recover']['Response'], AxiosError, TypeApiAuth['Recover']['Payload']>({
        mutationFn: authApi.recover,
        onSuccess: () => {
            notifyStore.show({ color: NotifyColor.success, messageIntl: AuthLanguage.notify.recover.success });
        },
        onError: (error) => {
            const code = Number(error.response?.status);
            let messageIntl: string;
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
