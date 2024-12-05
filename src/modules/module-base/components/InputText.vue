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

defineOptions({ name: 'InputText', extends: VTextField, inheritAttrs: false });
defineProps<InputTextProps>();
const emits = defineEmits<{
    (e: 'set-ref', elem: TypeInputElem): void;
    (e: 'input'): void;
    (e: 'on-change', event: unknown): void;
}>();

const inputRef = useTemplateRef<TypeInputElem>('input-ref');

watch(inputRef, () => emits('set-ref', inputRef.value));
</script>

<template>
    <v-text-field
        v-bind.prop="$props"
        ref="input-ref"
        :spellcheck="false"
        autocomplete="off"
        variant="outlined"
        @update:model-value="$emit('on-change', $event)"
        @input="$emit('input')"
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
