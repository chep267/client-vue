<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { mdiChevronTripleLeft, mdiChevronTripleRight } from '@mdi/js';

defineProps<{
    disabled?: boolean;
    openSider?: boolean;
}>();

defineEmits<{
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
                @click.stop="$emit('toggleSider')">
                <v-icon
                    :icon="openSider ? mdiChevronTripleLeft : mdiChevronTripleRight"
                    :color="disabled ? 'disabled' : 'primary'"
                    size="24" />
            </v-btn>
        </template>
    </v-tooltip>
</template>
