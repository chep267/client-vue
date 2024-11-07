<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { ref, watch, useAttrs } from 'vue';

/** types */
import type { TypeInputElem, InputBaseProps } from '@module-base/types';

const emits = defineEmits<{
    (e: 'set-ref', elem: TypeInputElem): void;
}>();

const attrs: InputBaseProps = useAttrs();
const inputRef = ref<TypeInputElem>(null);

watch(inputRef, () => emits('set-ref', inputRef.value));
</script>

<template>
    <v-text-field v-bind="attrs" ref="inputRef" :type="attrs.type || 'text'" variant="outlined" :spellcheck="false" />
</template>

<style lang="scss" scoped>
:deep(.v-input__details) {
    padding-inline: 0;
    .v-messages__message {
        text-align: right;
    }
}
</style>
