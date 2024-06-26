<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

/** constants */
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** hooks */
import { useSiderStore, SiderState } from '@module-base/hooks/useSiderStore.ts';
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';

/** components */
import AppSiderButtonCollapse from '@module-global/components/AppSider/AppSiderButtonCollapse.vue';
import AppSiderMenuApp from '@module-global/components/AppSider/AppSiderMenuApp.vue';

const authStore = useAuthStore();
const siderStore = useSiderStore();

const { isAuthentication } = storeToRefs(authStore);
const { siderState } = storeToRefs(siderStore);
const openSider = ref(true);

watch(isAuthentication, () => {
    if (isAuthentication.value) {
        window.addEventListener('resize', siderStore.updateState);
    } else {
        window.removeEventListener('resize', siderStore.updateState);
    }
});
</script>

<template>
    <v-navigation-drawer
        v-if="isAuthentication"
        :width="ScreenSize.AppBarExpandWidth"
        :rail="!openSider || siderState === SiderState.collapse"
        :permanent="siderState !== SiderState.hidden"
        :app="true">
        <AppSiderButtonCollapse
            :open-sider="openSider"
            :disabled="siderState !== SiderState.expand"
            @toggle-sider="openSider = !openSider" />
        <v-divider v-once />
        <AppSiderMenuApp :disabled-tooltip="openSider && siderState !== SiderState.collapse" />
    </v-navigation-drawer>
</template>
