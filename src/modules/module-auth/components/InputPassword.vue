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
type TypeElem = HTMLInputElement | null;

defineProps<InputProps>();

const emits = defineEmits<{
    (e: 'setRef', elem: TypeElem): void;
}>();

const inputRef = ref<TypeElem>(null);
const visible = ref(false);

watch(inputRef, () => emits('setRef', inputRef.value));

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
        @click:append-inner.stop="onSeen" />
</template>
