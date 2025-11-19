<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useTemplateRef, watchEffect } from 'vue';
import { Field } from 'vee-validate';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** type */
import type { RuleExpression, FieldContext } from 'vee-validate';

type TypeFieldTextProps = {
    name: string;
    label: string;
    error?: boolean;
    errorMessage?: string;
    rules: RuleExpression<unknown>;
};

type TypeFieldTextEmits = {
    (e: 'update:ref', elem: App.ModuleBase.Component.InputElement): void;
    (
        e: 'update:model-value',
        value: any,
        handleChange: FieldContext['handleChange'],
        setErrors: FieldContext['setErrors']
    ): void;
};

defineOptions({ name: 'FieldText', inheritAttrs: true });
defineProps<TypeFieldTextProps>();
const emits = defineEmits<TypeFieldTextEmits>();

const inputRef = useTemplateRef<App.ModuleBase.Component.InputElement>('input-ref');

watchEffect(() => {
    emits('update:ref', inputRef.value);
});
</script>

<template>
    <Field v-slot="{ value, handleChange, errorMessage: errorText, setErrors }" :name="name" :rules="rules">
        <v-text-field
            ref="input-ref"
            :autofocus="true"
            :spellcheck="false"
            autocomplete="off"
            variant="outlined"
            :aria-label="name"
            :model-value="value"
            :label="$t(label)"
            :error="error"
            :error-messages="$t(errorMessage || errorText || BaseLanguage.component.label.default)"
            @update:model-value="$emit('update:model-value', $event, handleChange, setErrors)"
        />
    </Field>
</template>
