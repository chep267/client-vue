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

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** services */
import { authService } from '@module-auth/services';

export function useSignout() {
    const { push } = useRouter();
    const authStore = useAuthStore();
    const uid = Cookies.get(AppKey.uid) || '';

    return useMutation({
        mutationFn: () => authService.signout({ uid }),
        onSettled: () => {
            authStore.signout();
            push('/').then();
        },
    });
}
