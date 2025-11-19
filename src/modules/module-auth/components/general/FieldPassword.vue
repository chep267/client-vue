<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { ref, useTemplateRef, watchEffect } from 'vue';
import { Field } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';

/** constants */
import { AppRegex } from '@module-base/constants/AppRegex';
import { BaseLanguage } from '@module-base/constants/BaseLanguage';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { focusInput } from '@module-base/utils/focusInput';

/** type */
import type { RuleExpression, FieldContext } from 'vee-validate';

type TypeFieldPasswordProps = {
    name: string;
    label: string;
    error?: boolean;
    errorMessage?: string;
    rules: RuleExpression<unknown>;
};

type TypeFieldPasswordEmits = {
    (e: 'update:ref', elem: App.ModuleBase.Component.InputElement): void;
    (
        e: 'update:model-value',
        value: any,
        handleChange: FieldContext['handleChange'],
        setErrors: FieldContext['setErrors']
    ): void;
};

defineOptions({ name: 'FieldPassword', inheritAttrs: true });
defineProps<TypeFieldPasswordProps>();
const emits = defineEmits<TypeFieldPasswordEmits>();

const visible = ref<boolean>(false);
const inputRef = useTemplateRef<App.ModuleBase.Component.InputElement>('input-ref');

const onSeen = () => {
    visible.value = !visible.value;
    focusInput({ elem: inputRef.value });
};

const validatePassword: RuleExpression<unknown> = (value) => {
    const password = value as string;
    if (!password?.trim()) {
        return AuthLanguage.status.password.empty;
    }
    return !AppRegex.password.test(password) ? AuthLanguage.status.password.invalid : true;
};

watchEffect(() => {
    emits('update:ref', inputRef.value);
});
</script>

<template>
    <Field v-slot="{ value, handleChange, errorMessage: errorText, setErrors }" :name="name" :rules="validatePassword">
        <v-text-field
            ref="input-ref"
            :autofocus="false"
            :spellcheck="false"
            autocomplete="off"
            variant="outlined"
            :aria-label="name"
            :model-value="value"
            :label="$t(label)"
            :type="visible ? 'text' : 'password'"
            :error="error"
            :error-messages="$t(errorMessage || errorText || BaseLanguage.component.label.default)"
            :append-inner-icon="visible ? mdiEyeOff : mdiEye"
            @click:append-inner.stop="onSeen"
            @update:model-value="$emit('update:model-value', $event, handleChange, setErrors)"
        />
    </Field>
</template>
