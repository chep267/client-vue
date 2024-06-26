<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { type ExtractPropTypes, ref, watch } from 'vue';
import { VTextField } from 'vuetify/components/VTextField';
import { mdiAccount } from '@mdi/js';

/** types */
interface InputProps extends /* @vue-ignore */ Partial<ExtractPropTypes<VTextField>> {}
type TypeElem = HTMLInputElement | null;

defineProps<InputProps>();

const emits = defineEmits<{
    (e: 'setRef', elem: TypeElem): void;
}>();

const inputRef = ref<TypeElem>(null);

watch(inputRef, () => emits('setRef', inputRef.value));
</script>

<template>
    <v-text-field
        ref="inputRef"
        type="text"
        variant="outlined"
        :label="$t('module.auth.input.label.email')"
        :autocomplete="false"
        :spellcheck="false"
        :prepend-inner-icon="mdiAccount" />
</template>
