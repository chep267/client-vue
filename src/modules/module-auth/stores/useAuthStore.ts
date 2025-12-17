/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';

export const useAuthStore = defineStore('auth-store', {
    state: (): App.ModuleAuth.Store.AuthStore => {
        return {
            prePath: '/',
            user: null,
        };
    },
    getters: {
        isAuthentication(state) {
            return Boolean(state.user);
        },
    },
    actions: {
        setPath(path: string) {
            this.prePath = path || this.prePath;
        },
        signin(payload: App.ModuleAuth.Api.Signin['Response']) {
            const { user } = payload.data;
            Cookies.set(AppKey.uid, user.uid);
            Cookies.set(AppKey.email, user.email || '');
            this.user = user;
        },
        signout() {
            Cookies.remove(AppKey.uid);
            this.user = null;
        },
    },
});
