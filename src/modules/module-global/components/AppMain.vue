<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { computed, defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';

/** hooks */
import { useAuthStore } from '@module-auth/hooks/useAuthStore';
import { useSiderStore } from '@module-base/hooks/useSiderStore';

/** lazy components */
const AppSiderMini = defineAsyncComponent(() => import('@module-global/components/AppSider/AppSiderMini.vue'));

const authStore = useAuthStore();
const siderStore = useSiderStore();
const { isAuthentication } = storeToRefs(authStore);
const { siderState } = storeToRefs(siderStore);

const containerStyle = computed(() => {
    const appBarMiniHeight = siderState.value === AppSiderState.hidden ? AppScreenSize.AppBarMiniHeight : 0;
    return {
        height: `calc(100% - ${isAuthentication.value ? appBarMiniHeight : 0}px)`,
    };
});
</script>

<template>
    <v-main>
        <AppSiderMini v-if="isAuthentication && siderState === AppSiderState.hidden" />
        <v-container :style="containerStyle" :fluid="true">
            <router-view />
        </v-container>
    </v-main>
</template>
