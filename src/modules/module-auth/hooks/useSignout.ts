/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi.ts';

/** constants */
import { NotifyColor } from '@module-base/constants/NotifyColor.ts';
import { ScreenPath } from '@module-global/constants/ScreenPath.ts';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage.ts';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore.ts';
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';

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
