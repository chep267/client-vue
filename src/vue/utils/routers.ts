/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { createRouter, createWebHistory } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';
import { ScreenPath } from '@module-global/constants/ScreenPath.ts';
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath.ts';

/** store */
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';

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
        path: AuthScreenPath.signin,
        component: AuthScreen,
    },
    {
        path: AuthScreenPath.register,
        component: AuthScreen,
    },
    {
        path: AuthScreenPath.recover,
        component: AuthScreen,
    },

    /** main */
    {
        path: ScreenPath.home,
        component: FeedScreen,
    },
    {
        path: ScreenPath.start,
        component: StartScreen,
    },
    {
        path: ScreenPath.feed,
        component: FeedScreen,
    },
    {
        path: ScreenPath.messenger,
        component: MessengerScreen,
    },
    {
        path: ScreenPath.calendar,
        component: CalendarScreen,
    },
    {
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
const cookies = useCookies();

routers.beforeEach((to) => {
    const uid = cookies.get(AppKey.uid);
    const authStore = useAuthStore();

    if (!authStore.isAuthentication) {
        if (uid && to.path !== ScreenPath.start) {
            // redirect to /start => call re-signin
            authStore.setPath(to.path);
            return { path: ScreenPath.start };
        }
        if (!uid && !AuthPath.some((path) => to.path.startsWith(path))) {
            // redirect to /signin => call signin
            return { path: AuthScreenPath.signin };
        }
    }
    if (authStore.isAuthentication && AuthPath.some((path) => to.path.startsWith(path))) {
        // redirect to / => home!!
        return { path: ScreenPath.home };
    }
    if (to.path === ScreenPath.home) {
        return { path: ScreenPath.defaultPath };
    }
});
