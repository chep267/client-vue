<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
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

/** components */
import ButtonCollapse from '@module-global/components/AppSider/ButtonCollapse.vue';
import MenuApp from '@module-global/components/AppSider/MenuApp.vue';

const siderStore = useSiderStore();
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
        :width="AppScreenSize.AppBarExpandWidth"
        :rail="siderState === AppSiderState.force || siderState === AppSiderState.collapse"
        :rail-width="AppScreenSize.AppBarCollapseWidth"
        :permanent="siderState !== AppSiderState.hidden"
        :app="true"
    >
        <ButtonCollapse
            :open-sider="siderState === AppSiderState.expand"
            :disabled="siderState === AppSiderState.force"
            @toggle-sider="siderStore.toggleSiderState"
        />
        <v-divider v-once />
        <MenuApp :disabled-tooltip="openSider && siderState !== AppSiderState.collapse" />
    </v-navigation-drawer>
</template>
