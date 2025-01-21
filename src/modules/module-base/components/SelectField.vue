<script setup lang="ts">
/** libs */
import { onMounted, ref } from 'vue';
import { VSelect } from 'vuetify/components/VSelect';

/** types */
import type { SelectFieldProps, SelectFieldSlots, TypeInputElem } from '@module-base/types';

defineOptions({ name: 'SelectField', extends: VSelect, inheritAttrs: true });
defineProps<SelectFieldProps>();
const emits = defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
    (e: 'update:model-value', value: string): void;
}>();
defineSlots<SelectFieldSlots>();

const inputRef = ref<TypeInputElem>(null);

onMounted(() => emits('update:ref', inputRef.value));
</script>

<template>
    <v-select
        ref="inputRef"
        v-bind.prop="$props"
        v-bind.attr="$attrs"
        :spellcheck="false"
        autocomplete="off"
        variant="outlined"
        :class="{
            'select-field font-arial': true,
            'field-no-error-messages': !errorMessages,
        }"
        @update:model-value="$emit('update:model-value', $event)"
    >
        <!-- Forward slots -->
        <template v-for="(_slotContent, slotName) in $slots as SelectFieldSlots" #[slotName]="slotProps">
            <!-- @vue-ignore -->
            <slot :name="slotName" v-bind="{ ...slotProps }" />
        </template>
    </v-select>
</template>

<style lang="scss" scoped>
.select-field {
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
            & > input {
                height: 48px;
            }
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
            font-weight: 400;
            color: rgba(var(--v-theme-error), 1);
            font-family: Arial, sans-serif;
            line-height: 1.5;
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
.field-no-error-messages {
    &:deep(.v-input__details) {
        display: none;
    }
}
</style>
