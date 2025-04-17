<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { useTemplateRef, watch } from 'vue';
import { Field } from 'vee-validate';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** type */
import type { RuleExpression, FieldContext } from 'vee-validate';
import type { TypeInputElem } from '@module-base/types';

declare type TypeFieldTextProps = {
    name: string;
    label: string;
    errorMessage?: string;
    rules: RuleExpression<unknown>;
};

declare type TypeFieldTextEmits = {
    (e: 'update:ref', elem: TypeInputElem, field: string): void;
    (
        e: 'update:model-value',
        value: any,
        handleChange: FieldContext['handleChange'],
        setErrors: FieldContext['setErrors']
    ): void;
};

defineOptions({ name: 'FieldText', inheritAttrs: true });
const props = defineProps<TypeFieldTextProps>();
const emits = defineEmits<TypeFieldTextEmits>();

const inputRef = useTemplateRef<TypeInputElem>('input-ref');

watch(inputRef, () => {
    emits('update:ref', inputRef.value, props.name);
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
            :error-messages="$t(errorMessage || errorText || BaseLanguage.component.label.default)"
            @update:ref="$emit('update:ref', $event, name)"
            @update:model-value="$emit('update:model-value', $event, handleChange, setErrors)"
        />
    </Field>
</template>
