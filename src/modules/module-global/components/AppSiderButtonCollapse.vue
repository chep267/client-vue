<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** icons */
import { mdiChevronTripleLeft, mdiChevronTripleRight } from '@mdi/js';

defineProps<{
    disabled?: boolean;
    openSider?: boolean;
}>();

const emit = defineEmits<{
    (e: 'toggleSider'): void;
}>();
</script>

<template>
    <v-tooltip :text="$t(`module.global.components.sider.tooltip.${openSider ? 'collapse' : 'expand'}`)" location="right">
        <template #activator="{ props }">
            <v-btn
                v-bind="props"
                class="flex align-center justify-center w-full min-w-0 rounded-none"
                :disabled="disabled"
                @click="emit('toggleSider')">
                <v-icon v-if="openSider" :icon="mdiChevronTripleLeft" :color="disabled ? 'disabled' : 'info'" size="24" />
                <v-icon v-else :icon="mdiChevronTripleRight" :color="disabled ? 'disabled' : 'info'" size="24" />
            </v-btn>
        </template>
    </v-tooltip>
</template>
