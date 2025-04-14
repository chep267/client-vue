<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';

/** hooks */
import { useSiderStore } from '@module-base/hooks/useSiderStore';
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

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
        :width="AppScreenSize.AppBarExpandWidth"
        :rail="siderState === AppSiderState.force || siderState === AppSiderState.collapse"
        :rail-width="AppScreenSize.AppBarCollapseWidth"
        :permanent="siderState !== AppSiderState.hidden"
        :app="true"
    >
        <AppSiderButtonCollapse
            :open-sider="siderState === AppSiderState.expand"
            :disabled="siderState === AppSiderState.force"
            @toggle-sider="siderStore.toggleSiderState"
        />
        <v-divider v-once />
        <AppSiderMenuApp :disabled-tooltip="openSider && siderState !== AppSiderState.collapse" />
    </v-navigation-drawer>
</template>
