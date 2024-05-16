<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { type ExtractPropTypes, ref, watch } from 'vue';

/** icons */
import { mdiEye, mdiEyeOff, mdiLockOutline } from '@mdi/js';

/** utils */
import { focusInput } from '@module-base/utils/focusInput.ts';

/** type */
import type { VTextField } from 'vuetify/components/VTextField';

interface InputProps extends /* @vue-ignore */ Partial<ExtractPropTypes<VTextField>> {}

defineProps<InputProps>();

const emit = defineEmits<{
    (e: 'setRef', id: HTMLInputElement | null): void;
}>();

const visible = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

watch(inputRef, () => emit('setRef', inputRef.value));

const onSeen = () => {
    focusInput({ elem: inputRef.value, fnCallback: () => (visible.value = !visible.value) });
};
</script>

<template>
    <v-text-field
        ref="inputRef"
        variant="outlined"
        :type="visible ? 'text' : 'password'"
        :label="$t('module.auth.input.label.password')"
        :autocomplete="undefined"
        :spellcheck="false"
        :prepend-inner-icon="mdiLockOutline"
        :append-inner-icon="visible ? mdiEyeOff : mdiEye"
        @click:append-inner="onSeen" />
</template>
