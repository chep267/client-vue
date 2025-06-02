/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { defineStore } from 'pinia';
import Cookie from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';

export const useAuthStore = defineStore('auth-store', {
    state: (): App.ModuleAuth.Hook.AuthStore => {
        return {
            prePath: '/',
            user: null,
        };
    },
    getters: {
        isAuthentication(state) {
            return !!state.user;
        },
    },
    actions: {
        setPath(path: string) {
            this.prePath = path || this.prePath;
        },
        signin(payload: App.ModuleAuth.Api.Signin['Response']['data']) {
            const { user } = payload;
            Cookie.set(AppKey.uid, user.uid);
            Cookie.set(AppKey.email, user.email || '');
            this.user = user;
        },
        signout() {
            Cookie.remove(AppKey.uid);
            this.user = null;
        },
    },
});
