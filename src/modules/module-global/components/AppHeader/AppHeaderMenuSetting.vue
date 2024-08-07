<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { computed } from 'vue';
import { useTheme, useLocale } from 'vuetify';
import { storeToRefs } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';

/** icons */
import {
    mdiPalette,
    mdiWeatherNight,
    mdiWhiteBalanceSunny,
    mdiGoogleTranslate,
    mdiCogOutline,
    mdiLogout,
    mdiCalendar,
    mdiCalendarWeek,
    mdiCalendarWeekBegin,
    mdiCalendarWeekend,
    mdiCalendarMonth,
    mdiCalendarPlus,
} from '@mdi/js';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';
import { localeObject } from '@module-language/constants/localeObject.ts';
import { LangLanguage } from '@module-language/constants/LangLanguage.ts';
import { themeObject } from '@module-theme/constants/themeObject.ts';
import { ThemeLanguage } from '@module-theme/constants/ThemeLanguage.ts';
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage.ts';
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage.ts';

/** utils */
import { setI18nLanguage } from '@module-language/utils/i18n.ts';

/** hooks */
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';
import { useSignout } from '@module-auth/hooks/useSignout.ts';
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore.ts';

/** types */
import type { TypeLocale } from '@module-language/types';
import type { TypeTheme } from '@module-theme/types';

type TypeMenuData = {
    id: string;
    title: string;
    icon: string;
    iconColor?: string;
    iconSize?: string | number;
    loading?: boolean;
    hidden?: boolean;
    onClick?(): void;
    subMenu?: TypeMenuData[];
};

const emits = defineEmits<{
    (e: 'closeMenu'): void;
}>();

const theme = useTheme();
const locale = useLocale();
const cookies = useCookies();
const authStore = useAuthStore();
const calendarStore = useCalendarStore();
const SIGN_OUT = useSignout();

const { isAuthentication } = storeToRefs(authStore);
const { display, isOnlyMonth } = storeToRefs(calendarStore);

const calendarSubMenu: TypeMenuData['subMenu'] = [
    {
        id: 'default',
        title: CalendarLanguage.component.label.display.default,
        icon: mdiCalendarWeek,
        onClick: () => calendarStore.setDisplay(CalendarDisplay.sunday),
    },
    {
        id: 'monday',
        title: CalendarLanguage.component.label.display.monday,
        icon: mdiCalendarWeekBegin,
        onClick: () => calendarStore.setDisplay(CalendarDisplay.monday),
    },
    {
        id: 'weekend',
        title: CalendarLanguage.component.label.display.weekend,
        icon: mdiCalendarWeekend,
        onClick: () => calendarStore.setDisplay(CalendarDisplay.weekend),
    },
    {
        id: 'onlyMonth',
        title: CalendarLanguage.component.label.display.onlyMonth,
        icon: mdiCalendar,
        onClick: () => calendarStore.setOnlyMonth(true),
    },
    {
        id: 'bothMonth',
        title: CalendarLanguage.component.label.display.bothMonth,
        icon: mdiCalendarPlus,
        onClick: () => calendarStore.setOnlyMonth(false),
    },
];

const menuBase: TypeMenuData[] = [
    {
        id: 'themes',
        title: ThemeLanguage.component.label.router,
        icon: mdiPalette,
        subMenu: [
            {
                id: themeObject.dark,
                title: ThemeLanguage.component.label.dark,
                icon: mdiWeatherNight,
                onClick: () => setTheme(themeObject.dark),
            },
            {
                id: themeObject.light,
                title: ThemeLanguage.component.label.light,
                icon: mdiWhiteBalanceSunny,
                iconColor: 'warning',
                onClick: () => setTheme(themeObject.light),
            },
        ],
    },
    {
        id: 'languages',
        title: LangLanguage.component.label.router,
        icon: mdiGoogleTranslate,
        subMenu: [
            {
                id: localeObject.vi,
                title: LangLanguage.component.label.vi,
                icon: 'flag:vi',
                iconSize: 20,
                onClick: () => setLocale(localeObject.vi),
            },
            {
                id: localeObject.en,
                title: LangLanguage.component.label.en,
                icon: 'flag:en',
                iconSize: 20,
                onClick: () => setLocale(localeObject.en),
            },
        ],
    },
];

const menuAuth = computed<TypeMenuData[]>(() => {
    const menuOnlyMonth = calendarSubMenu[isOnlyMonth.value ? 4 : 3];
    const _calendarSubMenu =
        display.value === CalendarDisplay.sunday
            ? [calendarSubMenu[1], calendarSubMenu[2], menuOnlyMonth]
            : display.value === CalendarDisplay.monday
              ? [calendarSubMenu[0], calendarSubMenu[2], menuOnlyMonth]
              : [calendarSubMenu[0], calendarSubMenu[1], menuOnlyMonth];
    return [
        {
            id: 'calendar',
            title: CalendarLanguage.component.label.router,
            icon: mdiCalendarMonth,
            subMenu: _calendarSubMenu,
        },
        {
            id: 'others',
            title: GlobalLanguage.component.label.otherSetting,
            icon: mdiCogOutline,
            hidden: !isAuthentication.value,
            subMenu: [
                {
                    id: 'signout',
                    title: GlobalLanguage.component.label.signout,
                    icon: mdiLogout,
                    loading: SIGN_OUT.isPending.value,
                    onClick: signout,
                },
            ],
        },
    ];
});

const setTheme = (value: TypeTheme) => {
    theme.global.name.value = value;
    cookies.set(AppKey.theme, value);
};
const setLocale = async (value: TypeLocale) => {
    cookies.set(AppKey.locale, value);
    await setI18nLanguage(value);
    locale.current.value = value;
};
const signout = () => {
    SIGN_OUT.mutate(
        {},
        {
            onSettled: () => emits('closeMenu'),
        }
    );
};
</script>

<template>
    <v-card class="mx-auto" :width="ScreenSize.AppBarExpandWidth">
        <v-list>
            <v-list-group v-for="menu in menuBase.concat(menuAuth)" :key="menu.id" :value="menu.id">
                <template #activator="{ props: vListProps }">
                    <v-list-item v-show="!menu.hidden" v-bind="vListProps" :title="$t(menu.title)">
                        <template #prepend>
                            <v-icon :icon="menu.icon" :color="menu.iconColor" />
                        </template>
                    </v-list-item>
                </template>
                <v-list-item
                    v-for="subMenu in menu.subMenu"
                    v-show="!subMenu.hidden"
                    :key="subMenu.id"
                    :title="$t(subMenu.title)"
                    :value="subMenu.id"
                    @click.stop="subMenu.onClick">
                    <template #prepend>
                        <v-btn v-if="subMenu.loading" :loading="true" variant="text" />
                        <v-icon v-else :icon="subMenu.icon" :color="subMenu.iconColor" :size="subMenu.iconSize" />
                    </template>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-card>
</template>
