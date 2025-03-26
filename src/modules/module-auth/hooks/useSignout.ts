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
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore';
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

/** types */
import type { AxiosError } from 'axios';
import type { UseMutationReturnType } from '@tanstack/vue-query';
import type { TypeApiAuth } from '@module-auth/types';

export function useSignout(): UseMutationReturnType<
    TypeApiAuth['SignOut']['Response'],
    AxiosError,
    TypeApiAuth['SignOut']['Payload'],
    unknown
> {
    const { push } = useRouter();
    const notifyStore = useNotifyStore();
    const authStore = useAuthStore();

    return useMutation<TypeApiAuth['SignOut']['Response'], AxiosError, TypeApiAuth['SignOut']['Payload']>({
        mutationFn: authApi.signOut,
        onSettled: () => {
            authStore.signout();
            push('/').then();
        },
        onError: () => {
            notifyStore.show({ color: NotifyColor.error, messageIntl: AuthLanguage.notify.server.error });
        },
    });
}
