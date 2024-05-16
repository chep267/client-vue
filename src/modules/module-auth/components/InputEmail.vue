<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { type ExtractPropTypes, ref, watch } from 'vue';

/** components */
import { VTextField } from 'vuetify/components/VTextField';

/** icons */
import { mdiAccount } from '@mdi/js';

interface InputProps extends /* @vue-ignore */ Partial<ExtractPropTypes<VTextField>> {}

defineProps<InputProps>();

const emit = defineEmits<{
    (e: 'setRef', id: HTMLInputElement | null): void;
}>();

const inputRef = ref(null);

watch(inputRef, () => emit('setRef', inputRef.value));
</script>

<template>
    <v-text-field
        ref="inputRef"
        :label="$t('module.auth.input.label.email')"
        type="text"
        variant="outlined"
        :autocomplete="false"
        :spellcheck="false"
        :prepend-inner-icon="mdiAccount" />
</template>
