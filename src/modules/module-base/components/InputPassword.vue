<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { ref } from 'vue';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { VTextField } from 'vuetify/components/VTextField';

/** utils */
import { focusInput } from '@module-base/utils/focusInput';

/** components */
import InputText from '@module-base/components/InputText.vue';

/** types */
import type { TypeInputElem } from '@module-base/types';

type TextFieldProps = InstanceType<typeof VTextField>['$props'];

interface InputTextProps extends /* @vue-ignore */ TextFieldProps {}

defineOptions({ name: 'InputPassword', extends: VTextField, inheritAttrs: false });
defineProps<InputTextProps>();
const emits = defineEmits<{
    (e: 'set-ref', elem: TypeInputElem): void;
    (e: 'input'): void;
    (e: 'on-change', event: unknown): void;
}>();

const inputRef = ref<TypeInputElem>(null);
const visible = ref(false);

const setRef = (elem: TypeInputElem) => {
    inputRef.value = elem;
    emits('set-ref', elem);
};
const onSeen = () => {
    focusInput({ elem: inputRef.value, fnCallback: () => (visible.value = !visible.value) });
};
</script>

<template>
    <input-text
        v-bind.prop="$props"
        :type="visible ? 'text' : 'password'"
        :append-inner-icon="visible ? mdiEyeOff : mdiEye"
        @click:append-inner.stop="onSeen"
        @set-ref="setRef"
        @input="$emit('input')"
        @on-change="$emit('on-change', $event)"
    />
</template>
