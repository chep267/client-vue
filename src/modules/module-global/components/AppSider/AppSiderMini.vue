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
import { ListApp } from '@module-global/constants/ListApp.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** store */
import { useSiderStore, SiderState } from '@module-base/hooks/useSiderStore.ts';
import { useAuthStore } from '@module-auth/hooks/useAuthStore.ts';

const route = useRoute();
const authStore = useAuthStore();
const siderStore = useSiderStore();

const { isAuthentication } = storeToRefs(authStore);
const { siderState } = storeToRefs(siderStore);

const tab = computed(() => ListApp.find(({ path }) => route.path.includes(path))?.path || '');
</script>

<template>
    <v-card
        v-if="isAuthentication && siderState === SiderState.hidden"
        class="sticky overscroll-contain"
        :style="`top: ${ScreenSize.HeaderHeight}px;`">
        <v-tabs :v-model="tab" slider-color="primary" align-tabs="center" show-arrows center-active grow>
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
