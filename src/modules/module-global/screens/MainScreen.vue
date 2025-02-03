<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

/** constants */
import { SiderState } from '@module-global/constants/SiderState';
import { ScreenSize } from '@module-global/constants/ScreenSize';

/** hooks */
import { useAuthStore } from '@module-auth/hooks/useAuthStore';
import { useSiderStore } from '@module-global/hooks/useSiderStore';

/** components */
import NotifyProvider from '@module-base/components/NotifyProvider.vue';
import AppHeader from '@module-global/components/AppHeader/index.vue';
import AppSider from '@module-global/components/AppSider/index.vue';
import AppMain from '@module-global/components/AppMain.vue';

const authStore = useAuthStore();
const siderStore = useSiderStore();
const { isAuthentication } = storeToRefs(authStore);
const { siderState } = storeToRefs(siderStore);

const notifyStyle = computed(() => {
    const appBarMiniHeight = siderState.value === SiderState.hidden ? ScreenSize.AppBarMiniHeight : 0;
    return {
        top: `${ScreenSize.HeaderHeight + (isAuthentication.value ? appBarMiniHeight : 0)}px`,
    };
});
</script>

<template>
    <NotifyProvider :style="notifyStyle">
        <v-app class="h-screen w-screen">
            <AppHeader />
            <AppSider />
            <AppMain />
        </v-app>
    </NotifyProvider>
</template>
