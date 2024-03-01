/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi.ts';

/** constants */
import { ScreenPath } from '@module-global/constants/ScreenPath.ts';

/** hooks */
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';

export function useSignout() {
    const { push } = useRouter();
    const authStore = useAuthStore();

    return useMutation({
        mutationFn: authApi.signout,
        onSettled: async () => {
            await authStore.signout();
            await push(ScreenPath.start);
        },
    });
}
