<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { useTheme, useLocale } from 'vuetify';
import { storeToRefs } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';

/** icons */
import { mdiPalette, mdiWeatherNight, mdiWhiteBalanceSunny, mdiGoogleTranslate, mdiCogOutline, mdiLogout } from '@mdi/js';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';

/** hooks */
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';
import { useSignout } from '@module-auth/hooks/useSignout.ts';
import { setI18nLanguage } from '@module-language/utils/i18n.ts';

type TypeMenuData = {
    id: string;
    title: string;
    icon: string;
    iconColor?: string;
    onClick?(): void;
    subMenu?: TypeMenuData[];
};

const theme = useTheme();
const locale = useLocale();
const authStore = useAuthStore();
const cookies = useCookies();
const SIGN_OUT = useSignout();

const { isAuthentication } = storeToRefs(authStore);

const props = defineProps<{
    onCloseMenu?(): void;
}>();

const setTheme = (value: 'dark' | 'light') => {
    theme.global.name.value = value;
    cookies.set(AppKey.theme, value);
};
const setLocale = async (value: 'vi' | 'en') => {
    cookies.set(AppKey.locale, value);
    await setI18nLanguage(value);
    locale.current.value = value;
};
const signout = () => {
    SIGN_OUT.mutate(
        {},
        {
            onSuccess: () => props.onCloseMenu?.(),
        }
    );
};

const menuBase: TypeMenuData[] = [
    {
        id: 'themes',
        title: 'module.theme.title',
        icon: mdiPalette,
        subMenu: [
            {
                id: 'Theme-Dark',
                title: 'module.theme.dark',
                icon: mdiWeatherNight,
                onClick: () => setTheme('dark'),
            },
            {
                id: 'Theme-Light',
                title: 'module.theme.light',
                icon: mdiWhiteBalanceSunny,
                iconColor: 'warning',
                onClick: () => setTheme('light'),
            },
        ],
    },
    {
        id: 'languages',
        title: 'module.language.title',
        icon: mdiGoogleTranslate,
        subMenu: [
            {
                id: 'Languages-Vi',
                title: 'module.language.vi',
                icon: 'flag:vi',
                onClick: () => setLocale('vi'),
            },
            {
                id: 'Languages-En',
                title: 'module.language.en',
                icon: 'flag:en',
                onClick: () => setLocale('en'),
            },
        ],
    },
];

const menuAuth: TypeMenuData[] = [
    {
        id: 'others',
        title: 'module.global.components.menu.setting.other',
        icon: mdiCogOutline,
        subMenu: [
            {
                id: 'signout',
                title: 'module.global.components.menu.setting.signout',
                icon: mdiLogout,
                onClick: signout,
            },
        ],
    },
];
</script>

<template>
    <v-card class="mx-auto" width="267">
        <v-list>
            <v-list-group v-for="menu in menuBase" :key="menu.id" :value="menu.id">
                <template #activator="{ props: vListProps }">
                    <v-list-item v-bind="vListProps" :title="$t(menu.title)">
                        <template #prepend>
                            <v-icon :icon="menu.icon" :color="menu.iconColor"></v-icon>
                        </template>
                    </v-list-item>
                </template>
                <v-list-item
                    v-for="subMenu in menu.subMenu"
                    :key="subMenu.id"
                    :title="$t(subMenu.title)"
                    :value="subMenu.id"
                    @click="subMenu.onClick">
                    <template #prepend>
                        <v-icon :icon="subMenu.icon" :color="subMenu.iconColor"></v-icon>
                    </template>
                </v-list-item>
            </v-list-group>
            <v-list-group v-for="menu in isAuthentication ? menuAuth : []" :key="menu.id" :value="menu.id">
                <template #activator="{ props: vListProps }">
                    <v-list-item v-bind="vListProps" :title="$t(menu.title)">
                        <template #prepend>
                            <v-icon :icon="menu.icon" :color="menu.iconColor"></v-icon>
                        </template>
                    </v-list-item>
                </template>
                <v-list-item
                    key="signout"
                    :title="$t('module.global.components.menu.setting.signout')"
                    value="signout"
                    @click="signout">
                    <template #prepend>
                        <v-btn v-if="SIGN_OUT.isPending.value" :loading="true" variant="text" />
                        <v-icon v-else :icon="mdiLogout" />
                    </template>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-card>
</template>
