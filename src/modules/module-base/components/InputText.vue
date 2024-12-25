<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { watch, useTemplateRef } from 'vue';
import { VTextField } from 'vuetify/components/VTextField';

/** types */
import type { TypeInputElem, InputTextProps } from '@module-base/types';

defineOptions({ name: 'InputText', extends: VTextField, inheritAttrs: true });
defineProps<InputTextProps>();
const emits = defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
    (e: 'update:model-value', value: string): void;
}>();

const inputRef = useTemplateRef<TypeInputElem>('input-ref');

watch(inputRef, () => emits('update:ref', inputRef.value));
</script>

<template>
    <v-text-field
        v-bind.prop="$props"
        ref="input-ref"
        :spellcheck="false"
        autocomplete="off"
        variant="outlined"
        @update:model-value="$emit('update:model-value', $event)"
    />
</template>

<style lang="scss" scoped>
:deep(.v-input__details) {
    padding-inline: 0;
    .v-messages__message {
        text-align: right;
    }
}
</style>
