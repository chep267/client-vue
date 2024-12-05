<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { ref, watch } from 'vue';
import { VTextField } from 'vuetify/components/VTextField';

/** types */
import type { TypeInputElem } from '@module-base/types';

type TextFieldProps = InstanceType<typeof VTextField>['$props'];

interface InputTextProps extends /* @vue-ignore */ TextFieldProps {}

defineOptions({ name: 'InputText', extends: VTextField, inheritAttrs: false });
defineProps<InputTextProps>();
const emits = defineEmits<{
    (e: 'set-ref', elem: TypeInputElem): void;
    (e: 'input'): void;
    (e: 'on-change', event: unknown): void;
}>();

const inputRef = ref<TypeInputElem>(null);

watch(inputRef, () => emits('set-ref', inputRef.value));
</script>

<template>
    <v-text-field
        v-bind.prop="$props"
        ref="inputRef"
        :spellcheck="false"
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
