<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { ref } from 'vue';
import { Field, Form } from 'vee-validate';
import Cookie from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { Regex } from '@module-base/constants/Regex';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { focusInput } from '@module-base/utils/focusInput';

/** hooks */
import { useRecover } from '@module-auth/hooks/useRecover';

/** components */
import InputText from '@module-base/components/InputText.vue';
import ButtonBase from '@module-base/components/ButtonBase.vue';
import AuthFormBreadcrumbs from '@module-auth/components/AuthFormBreadcrumbs.vue';

/** type */
import type { RuleExpression, SubmissionHandler, InvalidSubmissionHandler, FieldContext } from 'vee-validate';
import type { TypeInputElem } from '@module-base/types';

type TypeFormFieldsName = 'email';
type TypeFormData = {
    [Key in TypeFormFieldsName]: string;
};

const FormFieldsName: Readonly<{ [Key in TypeFormFieldsName]: Key }> = {
    email: 'email',
};

const hookRecover = useRecover();

const formFieldsRef = ref<Record<TypeFormFieldsName, TypeInputElem>>({
    [FormFieldsName.email]: null,
});
const errorStatus = ref('');

const initialValues: TypeFormData = {
    [FormFieldsName.email]: Cookie.get(AppKey.email) || '',
};

const validateEmail: RuleExpression<unknown> = (value) => {
    const email = value as TypeFormData[typeof FormFieldsName.email];
    if (!email?.trim()) {
        return AuthLanguage.status.email.empty;
    }
    return !Regex.email.test(email) ? AuthLanguage.status.email.invalid : true;
};
const handleResetError = (setErrors: FieldContext['setErrors']) => () => {
    errorStatus.value = '';
    setErrors('');
};
const handleInputChange = (value: string, handleChange: FieldContext['handleChange'], setErrors: () => void) => {
    setErrors();
    handleChange(value, false);
};
const onSubmit: SubmissionHandler = (data) => {
    if (errorStatus.value) {
        focusInput({ elem: formFieldsRef.value[FormFieldsName.email] });
        return;
    }
    hookRecover.mutate(data as TypeFormData, {
        onError: (error) => {
            const code = Number(error.response?.status);
            switch (true) {
                case code >= 400 && code < 500:
                    errorStatus.value = AuthLanguage.notify.recover.error;
                    break;
                default:
                    errorStatus.value = AuthLanguage.notify.server.error;
            }
            focusInput({ elem: formFieldsRef.value[FormFieldsName.email] });
        },
    });
};
const onSubmitError: InvalidSubmissionHandler = ({ errors }) => {
    const listFieldsCheck: TypeFormFieldsName[] = [FormFieldsName.email];
    const field = listFieldsCheck.find((field) => field in errors);
    if (field) {
        focusInput({ elem: formFieldsRef.value[field] });
    }
};
</script>

<template>
    <Form
        v-slot="{ isSubmitting, isValidating }"
        as="v-form"
        class="flex flex-col w-full max-w-xl gap-y-2 p-6 shadow-lg shadow-gray-500/40 rounded-md z-10"
        :initial-values="initialValues"
        :on-submit="onSubmit"
        :on-invalid-submit="onSubmitError"
    >
        <Field
            v-slot="{ value, handleChange, errorMessage, setErrors }"
            :name="FormFieldsName.email"
            :rules="validateEmail"
            :validate-on-input="false"
        >
            <InputText
                :model-value="value"
                :label="$t(AuthLanguage.component.label.email)"
                :error-messages="errorMessage || errorStatus ? $t(errorMessage || errorStatus) : null"
                :autofocus="true"
                @update:ref="formFieldsRef[FormFieldsName.email] = $event"
                @update:model-value="handleInputChange($event, handleChange, handleResetError(setErrors))"
            />
        </Field>
        <div class="flex w-full items-end justify-between mt-2">
            <AuthFormBreadcrumbs />
            <ButtonBase
                class="font-bold capitalize tracking-normal"
                type="submit"
                color="primary"
                size="large"
                width="30%"
                :loading="isValidating || isSubmitting || hookRecover.isPending.value"
            >
                {{ $t(AuthLanguage.component.button.recover) }}
            </ButtonBase>
        </div>
    </Form>
</template>
