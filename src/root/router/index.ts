/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { createRouter, createWebHistory } from 'vue-router';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppRouterPath } from '@module-base/constants/AppRouterPath';
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import { AccountState } from '@module-auth/constants/AccountState';

/** store */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** screens */
const StartScreen = () => import('@module-auth/screens/StartScreen.vue');
const NotFoundScreen = () => import('@module-global/screens/NotFoundScreen.vue');
const AuthScreen = () => import('@module-auth/screens/AuthScreen.vue');
const FeedScreen = () => import('@module-global/screens/FeedScreen.vue');
const MessengerScreen = () => import('@module-global/screens/MessengerScreen.vue');
const CalendarScreen = () => import('@module-calendar/screens/CalendarScreen.vue');

export const routers = createRouter({
    history: createWebHistory(),
    scrollBehavior: (_to, _from, savedPosition) => {
        return savedPosition || { top: 0 };
    },
    routes: [
        /** authentication */
        {
            name: AuthRouterPath.signin,
            path: AuthRouterPath.signin,
            component: AuthScreen,
            meta: { requireAuth: false },
        },
        {
            name: AuthRouterPath.register,
            path: AuthRouterPath.register,
            component: AuthScreen,
            meta: { requireAuth: false },
        },
        {
            name: AuthRouterPath.recover,
            path: AuthRouterPath.recover,
            component: AuthScreen,
            meta: { requireAuth: false },
        },
        {
            name: AuthRouterPath.start,
            path: AuthRouterPath.start,
            component: StartScreen,
            meta: { requireAuth: false },
        },

        /** main */
        {
            name: AppRouterPath.feed,
            path: AppRouterPath.feed,
            component: FeedScreen,
            meta: { requireAuth: true },
        },
        {
            name: AppRouterPath.messenger,
            path: AppRouterPath.messenger,
            component: MessengerScreen,
            meta: { requireAuth: true },
        },
        {
            name: AppRouterPath.calendar,
            path: AppRouterPath.calendar,
            component: CalendarScreen,
            meta: { requireAuth: true },
        },
        {
            name: AppRouterPath.notFound,
            path: AppRouterPath.notFound,
            component: NotFoundScreen,
            meta: { requireAuth: true },
        },
        {
            path: '/:catchAll(.*)',
            component: NotFoundScreen,
            meta: { requireAuth: true },
        },
    ],
});

routers.beforeEach((to) => {
    const uid = Cookies.get(AppKey.uid);
    const authStore = useAuthStore();
    const accountState = authStore.isAuthentication
        ? AccountState.signedIn
        : Boolean(uid)
          ? AccountState.reSignIn
          : AccountState.signIn;

    const requireAuth = Boolean(to.meta.requireAuth);

    switch (true) {
        case accountState === AccountState.signIn && requireAuth: {
            /** not logged in, return to log in  */
            authStore.setPath(to.path);
            return { path: AuthRouterPath.signin };
        }
        case accountState === AccountState.reSignIn && to.path !== AuthRouterPath.start: {
            /** already logged in, get session */
            authStore.setPath(requireAuth ? to.path : AppRouterPath.home);
            return { path: AuthRouterPath.start };
        }
        case accountState === AccountState.signedIn && (!requireAuth || to.path === AppRouterPath.home): {
            /** logged in and go home */
            return { path: AppRouterPath.defaultPath };
        }
        default: // nothing
    }
});
