<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { ref } from 'vue';
import { useRouter } from 'vue-router';

/** icons */
import { mdiHome, mdiFacebookMessenger } from '@mdi/js';

/** constants */
import { ScreenPath } from '@module-global/constants/ScreenPath.ts';

defineProps<{
    disabledTooltip?: boolean;
}>();

const { push } = useRouter();

const navigate = (path: string) => push(path);

const ListApp = [
    {
        id: ScreenPath.feed,
        path: ScreenPath.feed,
        title: 'module.global.components.sider.app.feed',
        icon: mdiHome,
    },
    {
        id: ScreenPath.messenger,
        path: ScreenPath.messenger,
        title: 'module.global.components.sider.app.messenger',
        icon: mdiFacebookMessenger,
    },
];

const selected = ref<string[]>([ScreenPath.defaultPath]);
</script>

<template>
    <v-list v-model:selected="selected">
        <v-tooltip v-for="menu in ListApp" :key="menu.id" :text="$t(menu.title)" :disabled="disabledTooltip">
            <template #activator="{ props }">
                <v-list-item
                    v-bind="props"
                    :value="menu.id"
                    :prepend-icon="menu.icon"
                    :title="$t(menu.title)"
                    :color="selected.includes(menu.id) ? 'info' : undefined"
                    @click="() => navigate(menu.path)" />
            </template>
        </v-tooltip>
    </v-list>
</template>
