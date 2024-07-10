<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

/** constants */
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';
import { SiderState } from '@module-global/constants/SiderState.ts';

/** hooks */
import { useSiderStore } from '@module-global/hooks/useSiderStore.ts';
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';

/** components */
import AppSiderButtonCollapse from '@module-global/components/AppSider/AppSiderButtonCollapse.vue';
import AppSiderMenuApp from '@module-global/components/AppSider/AppSiderMenuApp.vue';

const authStore = useAuthStore();
const siderStore = useSiderStore();

const { isAuthentication } = storeToRefs(authStore);
const { siderState } = storeToRefs(siderStore);
const openSider = ref(true);

onMounted(() => {
    window.addEventListener('resize', siderStore.onResize);
});
onUnmounted(() => {
    window.removeEventListener('resize', siderStore.onResize);
});
</script>

<template>
    <v-navigation-drawer
        v-if="isAuthentication"
        :width="ScreenSize.AppBarExpandWidth"
        :rail="siderState === SiderState.force || siderState === SiderState.collapse"
        :rail-width="ScreenSize.AppBarCollapseWidth"
        :permanent="siderState !== SiderState.hidden"
        :app="true">
        <AppSiderButtonCollapse
            :open-sider="siderState === SiderState.expand"
            :disabled="siderState === SiderState.force"
            @toggle-sider="siderStore.toggleSiderState" />
        <v-divider v-once />
        <AppSiderMenuApp :disabled-tooltip="openSider && siderState !== SiderState.collapse" />
    </v-navigation-drawer>
</template>
