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

/** components */
import ButtonBase from '@module-base/components/ButtonBase.vue';

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
        :text="$t(openSider ? GlobalLanguage.component.label.collapse : GlobalLanguage.component.label.expand)"
        location="right"
    >
        <template #activator="{ props }">
            <ButtonBase
                v-bind="props"
                aria-label="toggle-sider"
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
            </ButtonBase>
        </template>
    </v-tooltip>
</template>
