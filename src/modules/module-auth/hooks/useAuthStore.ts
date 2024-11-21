/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { defineStore } from 'pinia';
import Cookie from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';

/** types */
import type { TypeApiAuth, TypeAuthStore } from '@module-auth/types';

export const useAuthStore = defineStore('auth-store', {
    state: (): TypeAuthStore => {
        return {
            prePath: '/',
            user: null,
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
            Cookie.set(AppKey.uid, user.uid);
            Cookie.set(AppKey.email, user.email || '');
            this.user = user;
        },
        async signout() {
            Cookie.remove(AppKey.uid);
            this.user = null;
        },
    },
});
