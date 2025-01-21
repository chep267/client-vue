<script setup lang="ts">
/** libs */
import { ref, onMounted } from 'vue';
import { VRadioGroup } from 'vuetify/components/VRadioGroup';

/** types */
import type { TypeInputElem, RadioGroupProps, RadioGroupSlots } from '@module-base/types';

defineOptions({ name: 'RadioGroup', extends: VRadioGroup, inheritAttrs: true });
defineProps<RadioGroupProps>();
const emits = defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
    (e: 'update:model-value', value: any): void;
}>();
defineSlots<RadioGroupSlots>();

const inputRef = ref<TypeInputElem>(null);

onMounted(() => emits('update:ref', inputRef.value));
</script>

<template>
    <v-radio-group
        ref="input-ref"
        v-bind.prop="$props"
        v-bind.attr="$attrs"
        :class="{
            'radio-field': true,
            'field-no-error-messages': !errorMessages,
        }"
        @update:model-value="$emit('update:model-value', $event)"
    >
        <!-- Forward slots -->
        <template v-for="(_slotContent, slotName) in $slots as RadioGroupSlots" #[slotName]="slotProps">
            <!-- @vue-ignore -->
            <slot :name="slotName" v-bind="{ ...slotProps }" />
        </template>
    </v-radio-group>
</template>

<style scoped lang="scss">
.radio-field {
    &:deep(.v-label) {
        color: rgb(var(--v-bs-body-color));
        font-family: Arial, sans-serif;
        font-weight: 400;
        font-size: 18px;
        line-height: 1.5;
        margin-left: 10px;
        opacity: 1;
    }
    &:deep(.v-icon--size-default) {
        font-size: 12px;
        background-color: rgba(var(--v-bs-boder-color), 1);
        border-radius: 50%;
    }
    &:deep(.v-selection-control--density-default) {
        --v-selection-control-size: 12px;
        .v-icon__svg {
            fill: rgba(var(--v-bs-border-color), 1);
        }
    }
    &:deep(.v-selection-control--dirty) {
        .v-icon__svg {
            fill: rgba(var(--v-theme-main), 1) !important;
        }
    }
    &:deep(.v-input__details) {
        padding-inline: 0;
        .v-messages__message {
            color: rgba(var(--v-theme-error), 1);
            opacity: 1;
            font-weight: 700;
        }
    }
}
.field-no-error-messages {
    &:deep(.v-input__details) {
        display: none;
    }
}
</style>
