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
import { ScreenSize } from '@module-global/constants/ScreenSize';
import { SiderState } from '@module-global/constants/SiderState';

/** hooks */
import { useAuthStore } from '@module-auth/hooks/useAuthStore';
import { useSiderStore } from '@module-global/hooks/useSiderStore';

/** components */
import AppSiderMini from '@module-global/components/AppSider/AppSiderMini.vue';

const authStore = useAuthStore();
const siderStore = useSiderStore();
const { isAuthentication } = storeToRefs(authStore);
const { siderState } = storeToRefs(siderStore);

const containerHeight = computed(() => {
    const appBarMiniHeight = siderState.value === SiderState.hidden ? ScreenSize.AppBarMiniHeight : 0;
    return `calc(100% - ${isAuthentication.value ? appBarMiniHeight : 0}px)`;
});
</script>

<template>
    <v-main>
        <AppSiderMini />
        <v-container :style="`height: ${containerHeight}`" :fluid="true">
            <router-view />
        </v-container>
    </v-main>
</template>
