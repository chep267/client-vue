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
import { themeObject } from '@module-theme/constants/themeObject.ts';
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** utils */
import { setI18nLanguage } from '@module-language/utils/i18n.ts';

/** hooks */
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';
import { useSignout } from '@module-auth/hooks/useSignout.ts';
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore.ts';

/** types */
import type { TypeLocale } from '@module-language/models';
import type { TypeTheme } from '@module-theme/models';

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
        id: 'module.calendar.setting.display.default',
        title: 'module.calendar.setting.display.default',
        icon: mdiCalendarWeek,
        onClick: () => calendarStore.setDisplay(CalendarDisplay.sunday),
    },
    {
        id: 'module.calendar.setting.display.mon',
        title: 'module.calendar.setting.display.mon',
        icon: mdiCalendarWeekBegin,
        onClick: () => calendarStore.setDisplay(CalendarDisplay.monday),
    },
    {
        id: 'module.calendar.setting.display.week',
        title: 'module.calendar.setting.display.week',
        icon: mdiCalendarWeekend,
        onClick: () => calendarStore.setDisplay(CalendarDisplay.weekend),
    },
    {
        id: 'module.calendar.setting.display.only.month',
        title: 'module.calendar.setting.display.only.month',
        icon: mdiCalendarMonth,
        onClick: () => calendarStore.setOnlyMonth(true),
    },
    {
        id: 'module.calendar.setting.display.both.month',
        title: 'module.calendar.setting.display.both.month',
        icon: mdiCalendarPlus,
        onClick: () => calendarStore.setOnlyMonth(false),
    },
];

const menuBase: TypeMenuData[] = [
    {
        id: 'themes',
        title: 'module.theme.text.title',
        icon: mdiPalette,
        subMenu: [
            {
                id: 'module.theme.text.dark',
                title: 'module.theme.text.dark',
                icon: mdiWeatherNight,
                onClick: () => setTheme(themeObject.dark),
            },
            {
                id: 'module.theme.text.light',
                title: 'module.theme.text.light',
                icon: mdiWhiteBalanceSunny,
                iconColor: 'warning',
                onClick: () => setTheme(themeObject.light),
            },
        ],
    },
    {
        id: 'languages',
        title: 'module.language.text.title',
        icon: mdiGoogleTranslate,
        subMenu: [
            {
                id: 'module.language.text.vi',
                title: 'module.language.text.vi',
                icon: 'flag:vi',
                iconSize: 20,
                onClick: () => setLocale('vi'),
            },
            {
                id: 'module.language.text.en',
                title: 'module.language.text.en',
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
            title: 'module.calendar.text.title',
            icon: mdiCalendar,
            subMenu: _calendarSubMenu,
        },
        {
            id: 'others',
            title: 'module.global.components.menu.setting.other',
            icon: mdiCogOutline,
            hidden: !isAuthentication.value,
            subMenu: [
                {
                    id: 'signout',
                    title: 'module.global.components.menu.setting.signout',
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
