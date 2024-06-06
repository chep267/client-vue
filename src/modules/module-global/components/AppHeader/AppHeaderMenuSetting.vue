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
import { computed } from 'vue';

type TypeMenuData = {
    id: string;
    title: string;
    icon: string;
    iconColor?: string;
    loading?: boolean;
    hidden?: boolean;
    onClick?(): void;
    subMenu?: TypeMenuData[];
};

const theme = useTheme();
const locale = useLocale();
const authStore = useAuthStore();
const cookies = useCookies();
const SIGN_OUT = useSignout();

const { isAuthentication } = storeToRefs(authStore);

const emit = defineEmits<{
    (e: 'closeMenu'): void;
}>();

const menuBase: TypeMenuData[] = [
    {
        id: 'themes',
        title: 'module.theme.title',
        icon: mdiPalette,
        subMenu: [
            {
                id: 'module.theme.dark',
                title: 'module.theme.dark',
                icon: mdiWeatherNight,
                onClick: () => setTheme('dark'),
            },
            {
                id: 'module.theme.light',
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
                id: 'module.language.vi',
                title: 'module.language.vi',
                icon: 'flag:vi',
                onClick: () => setLocale('vi'),
            },
            {
                id: 'module.language.en',
                title: 'module.language.en',
                icon: 'flag:en',
                onClick: () => setLocale('en'),
            },
        ],
    },
];

const menuAuth = computed<TypeMenuData[]>(() => {
    return [
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
            onSettled: () => emit('closeMenu'),
        }
    );
};
</script>

<template>
    <v-card class="mx-auto" width="267">
        <v-list>
            <v-list-group v-for="menu in menuBase.concat(menuAuth)" :key="menu.id" :value="menu.id">
                <template #activator="{ props: vListProps }">
                    <v-list-item v-show="!menu.hidden" v-bind="vListProps" :title="$t(menu.title)">
                        <template #prepend>
                            <v-icon :icon="menu.icon" :color="menu.iconColor"></v-icon>
                        </template>
                    </v-list-item>
                </template>
                <v-list-item
                    v-for="subMenu in menu.subMenu"
                    v-show="!subMenu.hidden"
                    :key="subMenu.id"
                    :title="$t(subMenu.title)"
                    :value="subMenu.id"
                    @click="subMenu.onClick">
                    <template #prepend>
                        <v-btn v-if="subMenu.loading" :loading="true" variant="text" />
                        <v-icon v-else :icon="subMenu.icon" :color="subMenu.iconColor"></v-icon>
                    </template>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-card>
</template>
