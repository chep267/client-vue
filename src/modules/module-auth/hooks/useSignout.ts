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

export function useSignout() {
    const { push } = useRouter();
    const authStore = useAuthStore();
    const notifyStore = useNotifyStore();

    return useMutation({
        mutationFn: authApi.signout,
        onSettled: async () => {
            await authStore.signout();
            await push(ScreenPath.start);
        },
        onError: () => {
            notifyStore.show({ color: NotifyColor.error, messageIntl: AuthLanguage.notify.server.error });
        },
    });
}
