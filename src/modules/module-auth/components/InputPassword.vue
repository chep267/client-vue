<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { onMounted, ref } from 'vue';

/** icons */
import { mdiEye, mdiEyeOff, mdiLockOutline } from '@mdi/js';

/** utils */
import { focusInput } from '@module-base/utils/focusInput.ts';

/** type */
import type { VTextField } from 'vuetify/components/VTextField';

const props = defineProps<{
    errorMessages: VTextField['errorMessages'];
    setRef?(elem: HTMLInputElement | null): void;
}>();

const visible = ref(false);
const inputRef = ref(null);

onMounted(() => {
    props.setRef?.(inputRef.value);
});

const onSeen = () => {
    const fnCallback = () => (visible.value = !visible.value);
    focusInput({ elem: inputRef.value, fnCallback });
};
</script>

<template>
    <v-text-field
        ref="inputRef"
        :label="$t('module.auth.input.label.password')"
        :type="visible ? 'text' : 'password'"
        variant="outlined"
        :autocomplete="false"
        :spellcheck="false"
        :prepend-inner-icon="mdiLockOutline"
        :append-inner-icon="visible ? mdiEyeOff : mdiEye"
        :error-messages="errorMessages"
        @click:append-inner="onSeen" />
</template>
