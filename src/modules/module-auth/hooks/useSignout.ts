/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import Cookies from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppNotifyColor } from '@module-base/constants/AppNotifyColor';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** stores */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** services */
import { authService } from '@module-auth/services';

export function useSignout() {
    const { push } = useRouter();
    const notifyStore = useNotifyStore();
    const authStore = useAuthStore();
    const uid = Cookies.get(AppKey.uid) || '';

    return useMutation({
        mutationFn: () => authService.signout({ uid }),
        onSettled: () => {
            authStore.signout();
            push('/').then();
        },
        onError: () => {
            notifyStore.show({ color: AppNotifyColor.error, messageIntl: AuthLanguage.notify.server.error });
        },
    });
}
