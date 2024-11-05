/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath';
import { ScreenPath } from '@module-global/constants/ScreenPath';

/** store */
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

/** screens */
const StartScreen = () => import(/* webpackChunkName: "start-screen" */ '@module-auth/screens/StartScreen.vue');
const NotFoundScreen = () => import(/* webpackChunkName: "not-found-screen" */ '@module-global/screens/NotFoundScreen.vue');
const AuthScreen = () => import(/* webpackChunkName: "auth-screen" */ '@module-auth/screens/AuthScreen.vue');
const FeedScreen = () => import(/* webpackChunkName: "feed-screen" */ '@module-global/screens/FeedScreen.vue');
const MessengerScreen = () => import(/* webpackChunkName: "messenger-screen" */ '@module-global/screens/MessengerScreen.vue');

const CalendarScreen = () =>
    import(/* webpackChunkName: "calendar-screen" */ '@module-calendar/screens/CalendarScreen/index.vue');

const routes = [
    /** authentication */
    {
        name: AuthScreenPath.signin,
        path: AuthScreenPath.signin,
        component: AuthScreen,
    },
    {
        name: AuthScreenPath.register,
        path: AuthScreenPath.register,
        component: AuthScreen,
    },
    {
        name: AuthScreenPath.recover,
        path: AuthScreenPath.recover,
        component: AuthScreen,
    },

    /** main */
    {
        name: ScreenPath.home,
        path: ScreenPath.home,
        component: FeedScreen,
    },
    {
        name: ScreenPath.start,
        path: ScreenPath.start,
        component: StartScreen,
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

const AuthPath = Object.values(AuthScreenPath);

routers.beforeEach(to => {
    const uid = Cookies.get(AppKey.uid) as string;
    const authStore = useAuthStore();

    if (!authStore.isAuthentication) {
        if (uid && to.path !== ScreenPath.start) {
            // redirect to /start => call re-signin
            authStore.setPath(to.path);
            return { path: ScreenPath.start };
        }
        if (!uid && !AuthPath.some(path => to.path.startsWith(path))) {
            // redirect to /signin => call signin
            return { path: AuthScreenPath.signin };
        }
    }
    if (authStore.isAuthentication && AuthPath.some(path => to.path.startsWith(path))) {
        // redirect to / => home!!
        return { path: ScreenPath.home };
    }
    if (to.path === ScreenPath.home) {
        return { path: ScreenPath.defaultPath };
    }
});
