<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

/** constants */
import { ListApp } from '@module-global/constants/ListApp';
import { ScreenSize } from '@module-global/constants/ScreenSize';
import { SiderState } from '@module-global/constants/SiderState';

/** store */
import { useSiderStore } from '@module-global/hooks/useSiderStore';
import { useAuthStore } from '@module-auth/hooks/useAuthStore';

const route = useRoute();
const authStore = useAuthStore();
const siderStore = useSiderStore();

const { isAuthentication } = storeToRefs(authStore);
const { siderState } = storeToRefs(siderStore);

const tab = computed(() => {
    const tab = ListApp.find(({ path }) => route.path.includes(path));
    return tab?.path || '';
});
</script>

<template>
    <v-card
        v-if="isAuthentication && siderState === SiderState.hidden"
        class="sticky overscroll-contain z-10"
        :style="`top: ${ScreenSize.HeaderHeight}px`"
    >
        <v-tabs
            :v-model="tab"
            slider-color="primary"
            align-tabs="center"
            show-arrows
            center-active
            grow
            :style="`top: ${ScreenSize.HeaderHeight}px; height: ${ScreenSize.AppBarMiniHeight}px`"
        >
            <v-tooltip v-for="app in ListApp" :key="app.id" :text="$t(app.title)" location="bottom">
                <template #activator="{ props }">
                    <v-tab v-bind="props" :to="app.path" :value="app.id">
                        <v-icon :icon="app.icon" :color="tab === app.path ? 'primary' : undefined" size="24" />
                    </v-tab>
                </template>
            </v-tooltip>
        </v-tabs>
    </v-card>
</template>
