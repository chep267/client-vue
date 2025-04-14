<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { Field } from 'vee-validate';

/** constants */
import { AppRegex } from '@module-base/constants/AppRegex';
import { BaseLanguage } from '@module-base/constants/BaseLanguage';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** components */
import InputText from '@module-base/components/InputText.vue';

/** type */
import type { RuleExpression, FieldContext } from 'vee-validate';
import type { TypeInputElem } from '@module-base/types';

defineOptions({ name: 'FieldEmail', inheritAttrs: true });
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

const validateEmail: RuleExpression<unknown> = (value) => {
    const email = value as string;
    if (!email?.trim()) {
        return AuthLanguage.status.email.empty;
    }
    return !AppRegex.email.test(email) ? AuthLanguage.status.email.invalid : true;
};
</script>

<template>
    <Field v-slot="{ value, handleChange, errorMessage: errorText, setErrors }" :name="name" :rules="validateEmail">
        <InputText
            :aria-label="name"
            :model-value="value"
            :label="$t(AuthLanguage.component.label.email)"
            :error="error"
            :error-messages="$t(errorMessage || errorText || BaseLanguage.component.label.default)"
            :autofocus="true"
            @update:ref="$emit('update:ref', $event, name)"
            @update:model-value="$emit('update:model-value', $event, handleChange, setErrors)"
        />
    </Field>
</template>
