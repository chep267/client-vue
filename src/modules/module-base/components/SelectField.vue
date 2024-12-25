<script setup lang="ts">
/** libs */
import { type ExtractPropTypes, ref, watch } from 'vue';
import { VSelect } from 'vuetify/components/VSelect';

/** types */
import type { TypeInputElem } from '@module-base/types';

interface SelectProps extends /* @vue-ignore */ Partial<ExtractPropTypes<VSelect>> {}

defineProps<SelectProps>();

const emits = defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
}>();

const inputRef = ref<TypeInputElem>(null);

watch(inputRef, () => emits('update:ref', inputRef.value));
</script>

<template>
    <v-select
        ref="inputRef"
        :class="{
            'select-base font-arial': true,
            'select-no-error-messages': !$attrs['error-messages'],
        }"
        bg-color="#fff"
        variant="outlined"
    />
</template>

<style lang="scss" scoped>
.select-base {
    &:deep(.v-field) {
        border-radius: 3px;
        background-color: white;
        min-height: 48px;
        max-height: 48px;
        .v-field__input {
            min-height: 48px;
            max-height: 48px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .v-field__append-inner {
            .v-icon {
                opacity: 1;
            }
        }
    }
    &:deep(.v-input__details) {
        padding-inline: 0;
        .v-messages__message {
            opacity: 1;
            font-weight: 700;
            color: rgba(var(--v-theme-error), 1);
        }
    }
    &:deep(.v-field__outline) {
        .v-field__outline__notch,
        .v-field__outline__notch:after,
        .v-field__outline__notch:before,
        .v-field__outline__start,
        .v-field__outline__end {
            border-color: rgba(var(--v-bs-border-color), 1);
            color: rgba(var(--v-bs-border-color), 1);
            opacity: 1;
        }
    }
}
:deep(.v-field--error:not(.v-field--disabled)) {
    .v-field__outline,
    .v-field__outline__notch,
    .v-field__outline__notch:after,
    .v-field__outline__notch:before,
    .v-field__outline__start,
    .v-field__outline__end {
        color: rgba(var(--v-theme-error), 1);
        border-color: rgba(var(--v-theme-error), 1);
    }
}
:deep(.v-field--active.v-field--variant-outlined .v-field__outline .v-field__outline__notch:before) {
    display: none;
}
.select-no-error-messages {
    &:deep(.v-input__details) {
        display: none;
    }
}
</style>
