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
import { useSiderStore, SiderState } from '@module-base/hooks/useSiderStore.ts';
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';

const authStore = useAuthStore();
const siderStore = useSiderStore();
const openSider = ref(true);

const { isAuthentication } = storeToRefs(authStore);
const { siderState } = storeToRefs(siderStore);

onMounted(() => {
    window.addEventListener('resize', siderStore.updateState);
});
onUnmounted(() => {
    window.removeEventListener('resize', siderStore.updateState);
});
</script>

<template>
    <v-navigation-drawer
        v-if="isAuthentication"
        :width="ScreenSize.AppBarExpandWidth"
        :rail="!openSider || siderState === SiderState.collapse"
        :permanent="siderState !== SiderState.hidden"
        :app="true">
        <app-sider-button-collapse
            :open-sider="openSider"
            :disabled="siderState !== SiderState.expand"
            @toggle-sider="openSider = !openSider" />
        <v-divider v-once />
        <app-sider-menu-app :disabled-tooltip="openSider && siderState !== SiderState.collapse" />
    </v-navigation-drawer>
</template>
