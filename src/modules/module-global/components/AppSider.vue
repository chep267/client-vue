<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';

/** constants */
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** components */
import AppSiderButtonCollapse from '@module-global/components/AppSiderButtonCollapse.vue';
import AppSiderMenuApp from '@module-global/components/AppSiderMenuApp.vue';

/** store */
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';

type TypeSiderState = 'hidden' | 'collapse' | 'expand';

const getState = (): TypeSiderState => {
    switch (true) {
        case window.innerWidth < 600:
            return 'hidden';
        case window.innerWidth < 900:
            return 'collapse';
        default:
            return 'expand';
    }
};

const authStore = useAuthStore();
const openSider = ref(true);
const siderState = ref<TypeSiderState>(getState());

const { isAuthentication } = storeToRefs(authStore);

const toggleSider = () => {
    openSider.value = !openSider.value;
};
const onResize = () => {
    siderState.value = getState();
};
onMounted(() => {
    window.addEventListener('resize', onResize);
});
onUnmounted(() => {
    window.removeEventListener('resize', onResize);
});
</script>

<template>
    <v-navigation-drawer
        v-if="isAuthentication"
        :width="ScreenSize.app_bar_max_width"
        :rail="!openSider || siderState === 'collapse'"
        :permanent="siderState !== 'hidden'"
        :app="true">
        <app-sider-button-collapse :open-sider="openSider" :disabled="siderState !== 'expand'" :toggle-sider="toggleSider" />
        <v-divider v-once />
        <app-sider-menu-app :disabled-tooltip="openSider" />
    </v-navigation-drawer>
    <template v-else />
</template>
