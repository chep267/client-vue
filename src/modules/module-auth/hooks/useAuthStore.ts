/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';

/** types */
import type { TypeApiAuth, TypeAuthStore } from '@module-auth/models';

const cookies = useCookies();

export const useAuthStore = defineStore('auth-store', {
    state: (): TypeAuthStore => {
        const uid = cookies.get(AppKey.uid);
        return {
            prePath: '/',
            user: null,
            state: uid ? 'start' : 'signin',
        };
    },
    getters: {
        isAuthentication(state) {
            return !!state.user;
        },
        getUser(state) {
            return state.user;
        },
    },
    actions: {
        setPath(path: string) {
            this.prePath = path || this.prePath;
        },
        async signin(payload: TypeApiAuth['Signin']['Response']['data']) {
            const { user } = payload;
            cookies.set(AppKey.uid, user.uid);
            cookies.set(AppKey.email, user.email);
            this.user = user;
        },
        async signout() {
            cookies.remove(AppKey.uid);
            this.user = null;
        },
    },
});
