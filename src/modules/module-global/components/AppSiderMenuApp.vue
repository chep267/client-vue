<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/** constants */
import { ListApp } from '@module-global/constants/ListApp.ts';

defineProps<{
    disabledTooltip?: boolean;
}>();

const route = useRoute();
const { push } = useRouter();

const selectedIds = computed(() => {
    return [route.path];
});
</script>

<template>
    <v-list v-model:selected="selectedIds">
        <v-tooltip v-for="app in ListApp" :key="app.id" :text="$t(app.title)" :disabled="disabledTooltip">
            <template #activator="{ props }">
                <v-list-item
                    v-bind="props"
                    :value="app.id"
                    :prepend-icon="app.icon"
                    :title="$t(app.title)"
                    :color="selectedIds.includes(app.id) ? 'info' : undefined"
                    @click="push(app.path)" />
            </template>
        </v-tooltip>
    </v-list>
</template>
