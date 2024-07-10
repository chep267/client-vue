<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

/** constants */
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';
import { SiderState } from '@module-global/constants/SiderState.ts';

/** hooks */
import { useSiderStore } from '@module-global/hooks/useSiderStore.ts';

/** components */
import AppSiderMini from '@module-global/components/AppSider/AppSiderMini.vue';

const siderStore = useSiderStore();
const { siderState } = storeToRefs(siderStore);

const containerHeight = computed(() => {
    const appBarMiniHeight = siderState.value === SiderState.hidden ? ScreenSize.AppBarMiniHeight : 0;
    return `calc(100% - ${appBarMiniHeight}px)`;
});
</script>

<template>
    <v-main class="relative">
        <AppSiderMini />
        <v-container :style="`height: ${containerHeight}`" :fluid="true">
            <router-view />
        </v-container>
    </v-main>
</template>
