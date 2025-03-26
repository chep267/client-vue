/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { createRouter, createWebHistory } from 'vue-router';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import { AccountState } from '@module-auth/constants/AccountState';
import { ScreenPath } from '@module-global/constants/ScreenPath';

/** store */
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

/** screens */
const StartScreen = () => import('@module-auth/screens/StartScreen.vue');
const NotFoundScreen = () => import('@module-global/screens/NotFoundScreen.vue');
const AuthScreen = () => import('@module-auth/screens/AuthScreen.vue');
const FeedScreen = () => import('@module-global/screens/FeedScreen.vue');
const MessengerScreen = () => import('@module-global/screens/MessengerScreen.vue');
const CalendarScreen = () => import('@module-calendar/screens/CalendarScreen.vue');

const routes = [
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
        name: ScreenPath.home,
        path: ScreenPath.home,
        component: FeedScreen,
    },
    {
        name: ScreenPath.feed,
        path: ScreenPath.feed,
        component: FeedScreen,
    },
    {
        name: ScreenPath.messenger,
        path: ScreenPath.messenger,
        component: MessengerScreen,
    },
    {
        name: ScreenPath.calendar,
        path: ScreenPath.calendar,
        component: CalendarScreen,
    },
    {
        name: ScreenPath.notFound,
        path: ScreenPath.notFound,
        component: NotFoundScreen,
    },
    {
        path: '/:catchAll(.*)',
        component: NotFoundScreen,
    },
];

export const routers = createRouter({
    history: createWebHistory(),
    routes,
});

const AuthPath = Object.values(AuthRouterPath);
routers.beforeEach((to) => {
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
        authStore.setPath(isAuthPath ? '/' : to.path);
        return { path: AuthRouterPath.start };
    }
    if (accountState === AccountState.signedIn) {
        /** đã đăng nhập xong, vào home */
        if (isAuthPath || to.path === ScreenPath.home) {
            return { path: ScreenPath.defaultPath };
        }
    }
});
