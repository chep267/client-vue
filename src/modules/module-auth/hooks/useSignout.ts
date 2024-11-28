/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi';

/** constants */
import { NotifyColor } from '@module-base/constants/NotifyColor';
import { ScreenPath } from '@module-global/constants/ScreenPath';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore';
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

/** types */
import type { AxiosError } from 'axios';
import type { UseMutationReturnType } from '@tanstack/vue-query';
import type { TypeApiAuth } from '@module-auth/types';

export function useSignout(): UseMutationReturnType<
    TypeApiAuth['Signout']['Response'],
    AxiosError,
    TypeApiAuth['Signout']['Payload'],
    unknown
> {
    const { push } = useRouter();
    const notifyStore = useNotifyStore();
    const authStore = useAuthStore();

    return useMutation<TypeApiAuth['Signout']['Response'], AxiosError, TypeApiAuth['Signout']['Payload']>({
        mutationFn: authApi.signout,
        onSettled: () => {
            authStore.signout();
            push(ScreenPath.start).then();
        },
        onError: () => {
            notifyStore.show({ color: NotifyColor.error, messageIntl: AuthLanguage.notify.server.error });
        },
    });
}
