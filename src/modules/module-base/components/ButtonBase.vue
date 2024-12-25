<script setup lang="ts">
/** libs */
import { VBtn } from 'vuetify/components/VBtn';

/** types */
import type { ButtonBaseProps } from '@module-base/types';

defineOptions({ name: 'ButtonBase', extends: VBtn, inheritAttrs: true });
defineProps<ButtonBaseProps>();
</script>

<template>
    <v-btn
        v-bind.prop="$props"
        v-bind.attr="$attrs"
        :class="{
            'button-no-overlay': overlay === 'none',
            [`${$props.class}`]: Boolean($props.class),
        }"
    >
        <slot />
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
