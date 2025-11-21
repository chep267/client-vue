/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';

/** constants */
import { AppNotifyColor } from '@module-base/constants/AppNotifyColor';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** stores */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** services */
import { authService } from '@module-auth/services';

/** types */
import type { AxiosError } from 'axios';

export function useSignin() {
    const { push } = useRouter();
    const notifyStore = useNotifyStore();
    const authStore = useAuthStore();

    return useMutation({
        mutationFn: authService.signin,
        onSuccess: (response) => {
            authStore.signin(response.data);
            push('/').then();
        },
        onError: (error: AxiosError) => {
            const code = Number(error.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.signin.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            notifyStore.show({ color: AppNotifyColor.error, messageIntl });
        },
    });
}
