<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/** constants */
import { AppRouterPath } from '@module-base/constants/AppRouterPath';
import { ListApp } from '@module-global/constants/ListApp';

defineProps<{
    disabledTooltip?: boolean;
}>();

const route = useRoute();
const { push } = useRouter();

const tabs = ref<string[]>([AppRouterPath.defaultPath]);

watch(route, () => {
    tabs.value = [ListApp.find(({ path }) => route.path.includes(path))?.path || AppRouterPath.defaultPath];
});
</script>

<template>
    <v-list v-model:selected="tabs">
        <v-tooltip
            v-for="app in ListApp"
            :key="app.id"
            :aria-label="app.title"
            :text="$t(app.title)"
            :disabled="disabledTooltip"
        >
            <template #activator="{ props }">
                <v-list-item
                    v-bind="props"
                    :value="app.id"
                    :prepend-icon="app.icon"
                    :title="$t(app.title)"
                    color="primary"
                    @click.stop="push(app.path)"
                />
            </template>
        </v-tooltip>
    </v-list>
</template>
