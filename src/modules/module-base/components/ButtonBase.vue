<script setup lang="ts">
/** libs */
import clsx from 'clsx';
import { VBtn } from 'vuetify/components/VBtn';

/** types */
import type { ButtonProps, ButtonSlots } from '@module-base/types';

defineOptions({ name: 'ButtonBase', extends: VBtn, inheritAttrs: true });
withDefaults(defineProps<ButtonProps>(), {
    type: 'button',
});
// defineProps<ButtonProps>();
defineSlots<ButtonSlots>();
</script>

<template>
    <v-btn
        aria-pressed="true"
        aria-label="button"
        v-bind.prop="$props"
        v-bind.attr="$attrs"
        :class="
            clsx('cursor-pointer', {
                'button-no-overlay': overlay === 'none',
            })
        "
    >
        <!-- Forward slots -->
        <template v-for="(_slotContent, slotName) in $slots as ButtonSlots" :key="slotName" #[slotName]>
            <!-- @vue-ignore -->
            <slot :name="slotName" />
        </template>
    </v-btn>
</template>

<style lang="scss" scoped>
.button-no-overlay {
    background-color: transparent;
    &:focus-visible:after {
        display: none;
    }
    &:deep(.v-btn__overlay) {
        display: none;
    }
    &:deep(.v-btn__underlay) {
        display: none;
    }
    &:deep(.v-ripple__container) {
        display: none;
    }
}
</style>
