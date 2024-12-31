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
import type { TypeInputElem, InputTextProps } from '@module-base/types';

defineOptions({ name: 'InputPassword', extends: VTextField, inheritAttrs: true });
defineProps<InputTextProps>();
const emits = defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
    (e: 'update:model-value', value: string): void;
}>();

const inputRef = ref<TypeInputElem>(null);
const visible = ref(false);

const updateRef = (elem: TypeInputElem) => {
    inputRef.value = elem;
    emits('update:ref', elem);
};
const onSeen = () => {
    visible.value = !visible.value;
    focusInput({ elem: inputRef.value });
};
</script>

<template>
    <InputText
        v-bind.prop="$props"
        v-bind.attr="$attrs"
        :type="visible ? 'text' : 'password'"
        :append-inner-icon="visible ? mdiEyeOff : mdiEye"
        @click:append-inner.stop="onSeen"
        @update:ref="updateRef"
        @update:model-value="$emit('update:model-value', $event)"
    />
</template>
