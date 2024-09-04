<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { type ExtractPropTypes, ref, watch } from 'vue';
import { VTextField } from 'vuetify/components/VTextField';
import { mdiEye, mdiEyeOff, mdiLockOutline } from '@mdi/js';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage.ts';

/** utils */
import { focusInput } from '@module-base/utils/focusInput.ts';

/** type */
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
        :label="$t(AuthLanguage.component.label.password)"
        autocapitalize="off"
        :spellcheck="false"
        :prepend-inner-icon="mdiLockOutline"
        :append-inner-icon="visible ? mdiEyeOff : mdiEye"
        @click:append-inner.stop="onSeen"
    />
</template>

<style lang="scss" scoped>
:deep(.v-messages__message) {
    text-align: right;
}
</style>
