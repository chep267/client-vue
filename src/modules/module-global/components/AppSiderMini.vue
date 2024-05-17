<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { storeToRefs } from 'pinia';

/** constants */
import { ListApp } from '@module-global/constants/ListApp.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** store */
import { useSiderStore, SiderState } from '@module-base/hooks/useSiderStore.ts';
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';

const authStore = useAuthStore();
const siderStore = useSiderStore();

const { isAuthentication } = storeToRefs(authStore);
const { siderState } = storeToRefs(siderStore);
const headerHeight = `${ScreenSize.HeaderHeight}px`;
</script>

<template>
    <v-bottom-navigation
        v-if="isAuthentication && siderState === SiderState.hidden"
        class="app-bar-mini !sticky !w-full overflow-auto"
        color="primary"
        horizontal
        grow>
        <v-tooltip v-for="item in ListApp" :key="item.id" :text="$t(item.title)" location="bottom">
            <template #activator="{ props }">
                <v-btn v-bind="props" :to="item.path">
                    <v-icon :icon="item.icon" color="" size="24" />
                </v-btn>
            </template>
        </v-tooltip>
    </v-bottom-navigation>
</template>

<style scoped lang="scss">
.app-bar-mini {
    top: v-bind(headerHeight);
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
