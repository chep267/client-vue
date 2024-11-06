<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
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
    <v-tooltip :text="$t(GlobalLanguage.component.label[openSider ? 'collapse' : 'expand'])" location="right">
        <template #activator="{ props }">
            <v-btn
                v-bind="props"
                class="flex align-center justify-center w-full min-w-0 rounded-none"
                :disabled="disabled"
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
