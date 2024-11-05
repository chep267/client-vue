<script setup lang="ts">
/** libs */
import { ref, useAttrs } from 'vue';
import { mdiEye, mdiEyeOff } from '@mdi/js';

/** utils */
import { focusInput } from '@module-base/utils/focusInput';

/** components */
import InputText from '@module-base/components/InputText.vue';

/** types */
import type { InputBaseProps, TypeInputElem } from '@module-base/types';

const emits = defineEmits<{
    (e: 'set-ref', elem: TypeInputElem): void;
}>();

const attrs: InputBaseProps = useAttrs();
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
        v-bind="attrs"
        :type="visible ? 'text' : 'password'"
        autocapitalize="off"
        autocomplete="off"
        :append-inner-icon="visible ? mdiEyeOff : mdiEye"
        @click:append-inner.stop="onSeen"
        @set-ref="setRef"
    />
</template>
