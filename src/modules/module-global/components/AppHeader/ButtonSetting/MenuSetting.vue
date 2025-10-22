<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { computed } from 'vue';
import { useTheme, useLocale } from 'vuetify';
import { storeToRefs } from 'pinia';
import Cookie from 'js-cookie';

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
import { BaseLanguage } from '@module-base/constants/BaseLanguage';
import { AppKey } from '@module-base/constants/AppKey';
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { LocaleObject } from '@module-base/constants/LocaleObject';
import { ThemeObject } from '@module-base/constants/ThemeObject';
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

/** utils */
import { flagIcon } from '@module-base/icons';
import { getMessage } from '@module-base/utils/i18n';

/** hooks */
import { useAuthStore } from '@module-auth/hooks/useAuthStore';
import { useSignout } from '@module-auth/hooks/useSignout';
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore';

type TypeMenuData = {
    id: string;
    title: string;
    icon: {
        name: string;
        color?: string;
        size?: string | number;
    };
    loading?: boolean;
    hidden?: boolean;
    onClick?(): void;
    subMenu?: TypeMenuData[];
};

const emits = defineEmits<{
    (e: 'close-menu'): void;
}>();

const theme = useTheme();
const locale = useLocale();
const authStore = useAuthStore();
const calendarStore = useCalendarStore();
const hookSignOut = useSignout();

const { isAuthentication } = storeToRefs(authStore);
const { display, isOnlyMonth } = storeToRefs(calendarStore);

const calendarSubMenu: TypeMenuData['subMenu'] = [
    {
        id: 'default',
        title: CalendarLanguage.component.label.display.default,
        icon: {
            name: mdiCalendarWeek,
        },
        onClick: () => calendarStore.setDisplay(CalendarDisplay.sunday),
    },
    {
        id: 'monday',
        title: CalendarLanguage.component.label.display.monday,
        icon: {
            name: mdiCalendarWeekBegin,
        },
        onClick: () => calendarStore.setDisplay(CalendarDisplay.monday),
    },
    {
        id: 'weekend',
        title: CalendarLanguage.component.label.display.weekend,
        icon: {
            name: mdiCalendarWeekend,
        },
        onClick: () => calendarStore.setDisplay(CalendarDisplay.weekend),
    },
    {
        id: 'onlyMonth',
        title: CalendarLanguage.component.label.display.onlyMonth,
        icon: {
            name: mdiCalendarMonth,
        },
        onClick: () => calendarStore.setOnlyMonth(true),
    },
    {
        id: 'bothMonth',
        title: CalendarLanguage.component.label.display.bothMonth,
        icon: {
            name: mdiCalendarPlus,
        },
        onClick: () => calendarStore.setOnlyMonth(false),
    },
];

const menuBase: TypeMenuData[] = [
    {
        id: 'themes',
        title: BaseLanguage.component.label.theme.router,
        icon: {
            name: mdiPalette,
        },
        subMenu: [
            {
                id: ThemeObject.dark,
                title: BaseLanguage.component.label.theme.dark,
                icon: {
                    name: mdiWeatherNight,
                },
                onClick: () => setTheme(ThemeObject.dark),
            },
            {
                id: ThemeObject.light,
                title: BaseLanguage.component.label.theme.light,
                icon: {
                    name: mdiWhiteBalanceSunny,
                    color: 'warning',
                },
                onClick: () => setTheme(ThemeObject.light),
            },
        ],
    },
    {
        id: 'languages',
        title: BaseLanguage.component.label.language.router,
        icon: {
            name: mdiGoogleTranslate,
        },
        subMenu: [
            {
                id: LocaleObject.vi,
                title: BaseLanguage.component.label.language.vi,
                icon: {
                    name: flagIcon.vi,
                    size: 20,
                },
                onClick: () => setLocale(LocaleObject.vi),
            },
            {
                id: LocaleObject.en,
                title: BaseLanguage.component.label.language.en,
                icon: {
                    name: flagIcon.en,
                    size: 20,
                },
                onClick: () => setLocale(LocaleObject.en),
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
            icon: {
                name: mdiCalendar,
            },
            hidden: !isAuthentication.value,
            subMenu: _calendarSubMenu,
        },
        {
            id: 'others',
            title: GlobalLanguage.component.label.otherSetting,
            icon: {
                name: mdiCogOutline,
            },
            hidden: !isAuthentication.value,
            subMenu: [
                {
                    id: 'signout',
                    title: GlobalLanguage.component.label.signout,
                    icon: {
                        name: mdiLogout,
                    },
                    loading: hookSignOut.isPending.value,
                    onClick: signout,
                },
            ],
        },
    ];
});

const setTheme = (value: App.ModuleBase.Data.Theme) => {
    Cookie.set(AppKey.theme, value);
    theme.global.name.value = value;
};
const setLocale = async (value: App.ModuleBase.Data.Locale) => {
    await getMessage(value);
    Cookie.set(AppKey.locale, value);
    locale.current.value = value;
};
const signout = () => {
    hookSignOut.mutate(
        {},
        {
            onSettled: () => emits('close-menu'),
        }
    );
};
</script>

<template>
    <v-card class="mx-auto" :width="AppScreenSize.AppBarExpandWidth">
        <v-list>
            <v-list-group v-for="menu in menuBase.concat(menuAuth)" :key="menu.id" :value="menu.id">
                <template #activator="{ props: vListProps }">
                    <v-list-item v-show="!menu.hidden" v-bind="vListProps" :title="$t(menu.title)">
                        <template #prepend>
                            <v-icon :icon="menu.icon.name" :color="menu.icon.color" />
                        </template>
                    </v-list-item>
                </template>
                <v-list-item
                    v-for="subMenu in menu.subMenu"
                    v-show="!subMenu.hidden"
                    :key="subMenu.id"
                    :title="$t(subMenu.title)"
                    :value="subMenu.id"
                    @click.stop="subMenu.onClick"
                >
                    <template #prepend>
                        <v-btn v-if="subMenu.loading" aria-label="loading" variant="text" :loading="true" />
                        <v-icon
                            v-else
                            :icon="subMenu.icon.name"
                            :color="subMenu.icon.color"
                            :size="subMenu.icon.size"
                        />
                    </template>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-card>
</template>
