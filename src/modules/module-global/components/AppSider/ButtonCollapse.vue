<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { mdiChevronTripleLeft, mdiChevronTripleRight } from '@mdi/js';

/** constants */
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

defineProps<{
    disabled?: boolean;
    openSider?: boolean;
}>();

defineEmits<{
    (e: 'toggle-sider'): void;
}>();
</script>

<template>
    <v-tooltip
        location="right"
        aria-label="toggle sider"
        :text="$t(openSider ? GlobalLanguage.component.label.collapse : GlobalLanguage.component.label.expand)"
    >
        <template #activator="{ props }">
            <v-btn
                v-bind="props"
                aria-label="toggle sider"
                class="w-full min-w-0 rounded-none"
                :disabled="disabled"
                elevation="0"
                rounded="0"
                @click.stop="$emit('toggle-sider')"
            >
                <v-icon
                    :icon="openSider ? mdiChevronTripleLeft : mdiChevronTripleRight"
                    :color="disabled ? 'disabled' : 'primary'"
                    size="24"
                />
            </v-btn>
        </template>
    </v-tooltip>
</template>
