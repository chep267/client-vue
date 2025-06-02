<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

import { computed } from 'vue';
import { useRoute } from 'vue-router';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { ListApp } from '@module-global/constants/ListApp';

const route = useRoute();

const tab = computed(() => {
    const tab = ListApp.find(({ path }) => route.path.includes(path));
    return tab?.path || '';
});
</script>

<template>
    <v-card class="sticky z-1 overscroll-contain" :style="`top: ${AppScreenSize.HeaderHeight}px`">
        <v-tabs
            v-model="tab"
            slider-color="primary"
            align-tabs="center"
            show-arrows
            center-active
            grow
            :style="`top: ${AppScreenSize.HeaderHeight}px; height: ${AppScreenSize.AppBarMiniHeight}px`"
        >
            <v-tooltip v-for="app in ListApp" :key="app.id" :aria-label="app.title" :text="$t(app.title)" location="bottom">
                <template #activator="{ props }">
                    <v-tab v-bind="props" :aria-label="app.path" :to="app.path" :value="app.id">
                        <v-icon :icon="app.icon" :color="tab === app.path ? 'primary' : undefined" size="24" />
                    </v-tab>
                </template>
            </v-tooltip>
        </v-tabs>
    </v-card>
</template>
