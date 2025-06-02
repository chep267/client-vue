/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi';

/** constants */
import { AppNotifyColor } from '@module-base/constants/AppNotifyColor';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore';
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

/** types */
import type { AxiosError } from 'axios';
import type { UseMutationReturnType } from '@tanstack/vue-query';

export function useSignout(): UseMutationReturnType<
    App.ModuleAuth.Apis.SignOut['Response'],
    AxiosError,
    App.ModuleAuth.Apis.SignOut['Payload'],
    unknown
> {
    const { push } = useRouter();
    const notifyStore = useNotifyStore();
    const authStore = useAuthStore();

    return useMutation<App.ModuleAuth.Apis.SignOut['Response'], AxiosError, App.ModuleAuth.Apis.SignOut['Payload']>({
        mutationFn: authApi.signOut,
        onSettled: () => {
            authStore.signout();
            push('/').then();
        },
        onError: () => {
            notifyStore.show({ color: AppNotifyColor.error, messageIntl: AuthLanguage.notify.server.error });
        },
    });
}
