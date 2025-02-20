<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

import { computed } from 'vue';
import { useRoute } from 'vue-router';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';
import { ListApp } from '@module-global/constants/ListApp';

const route = useRoute();

const tab = computed(() => {
    const tab = ListApp.find(({ path }) => route.path.includes(path));
    return tab?.path || '';
});
</script>

<template>
    <v-card class="!sticky !z-10 overscroll-contain" :style="`top: ${ScreenSize.HeaderHeight}px`">
        <v-tabs
            v-model="tab"
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
