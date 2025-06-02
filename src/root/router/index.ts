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
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

/** screens */
const StartScreen = () => import('@module-auth/screens/StartScreen.vue');
const NotFoundScreen = () => import('@module-global/screens/NotFoundScreen.vue');
const AuthScreen = () => import('@module-auth/screens/AuthScreen.vue');
const FeedScreen = () => import('@module-global/screens/FeedScreen.vue');
const MessengerScreen = () => import('@module-global/screens/MessengerScreen.vue');
const CalendarScreen = () => import('@module-calendar/screens/CalendarScreen.vue');

export const routers = createRouter({
    history: createWebHistory(),
    routes: [
        /** authentication */
        {
            name: AuthRouterPath.signin,
            path: AuthRouterPath.signin,
            component: AuthScreen,
        },
        {
            name: AuthRouterPath.register,
            path: AuthRouterPath.register,
            component: AuthScreen,
        },
        {
            name: AuthRouterPath.recover,
            path: AuthRouterPath.recover,
            component: AuthScreen,
        },
        {
            name: AuthRouterPath.start,
            path: AuthRouterPath.start,
            component: StartScreen,
        },

        /** main */
        {
            name: AppRouterPath.feed,
            path: AppRouterPath.feed,
            component: FeedScreen,
        },
        {
            name: AppRouterPath.messenger,
            path: AppRouterPath.messenger,
            component: MessengerScreen,
        },
        {
            name: AppRouterPath.calendar,
            path: AppRouterPath.calendar,
            component: CalendarScreen,
        },
        {
            name: AppRouterPath.notFound,
            path: AppRouterPath.notFound,
            component: NotFoundScreen,
        },
        {
            path: '/:catchAll(.*)',
            component: NotFoundScreen,
        },
    ],
});

routers.beforeEach((to) => {
    const AuthPath = Object.values(AuthRouterPath);
    const uid = Cookies.get(AppKey.uid);
    const authStore = useAuthStore();
    const accountState = authStore.isAuthentication
        ? AccountState.signedIn
        : uid
          ? AccountState.reSignin
          : AccountState.signin;

    const isAuthPath = AuthPath.some((path) => to.path.startsWith(path));
    if (accountState === AccountState.signin && !isAuthPath) {
        /** chưa đăng nhập, trở về đăng nhập  */
        authStore.setPath(to.path);
        return { path: AuthRouterPath.signin };
    }
    if (accountState === AccountState.reSignin && to.path !== AuthRouterPath.start) {
        /** đã đăng nhập từ trước, lấy phiên đăng nhập */
        authStore.setPath(isAuthPath ? AppRouterPath.home : to.path);
        return { path: AuthRouterPath.start };
    }
    if (accountState === AccountState.signedIn) {
        /** đã đăng nhập xong, vào home */
        if (isAuthPath || to.path === AppRouterPath.home) {
            return { path: AppRouterPath.defaultPath };
        }
    }
});
