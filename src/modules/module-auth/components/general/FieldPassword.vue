<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { Field } from 'vee-validate';

/** constants */
import { Regex } from '@module-base/constants/Regex';
import { BaseLanguage } from '@module-base/constants/BaseLanguage';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** components */
import InputPassword from '@module-base/components/InputPassword.vue';

/** type */
import type { RuleExpression, FieldContext } from 'vee-validate';
import type { TypeInputElem } from '@module-base/types';

defineOptions({ name: 'FieldPassword', inheritAttrs: true });
defineProps<{
    name: string;
    error?: boolean;
    errorMessage?: string;
}>();
defineEmits<{
    (e: 'update:ref', elem: TypeInputElem, field: string): void;
    (
        e: 'update:model-value',
        value: any,
        handleChange: FieldContext['handleChange'],
        setErrors: FieldContext['setErrors']
    ): void;
}>();

const validatePassword: RuleExpression<unknown> = (value) => {
    const password = value as string;
    if (!password?.trim()) {
        return AuthLanguage.status.password.empty;
    }
    return !Regex.password.test(password) ? AuthLanguage.status.password.invalid : true;
};
</script>

<template>
    <Field v-slot="{ value, handleChange, errorMessage: errorText, setErrors }" :name="name" :rules="validatePassword">
        <InputPassword
            :aria-label="name"
            :model-value="value"
            :label="$t(AuthLanguage.component.label.password)"
            :error="error || Boolean(errorMessage || errorText)"
            :error-messages="$t(errorMessage || errorText || BaseLanguage.component.label.default)"
            @update:ref="$emit('update:ref', $event, name)"
            @update:model-value="$emit('update:model-value', $event, handleChange, setErrors)"
        />
    </Field>
</template>
