<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { ref } from 'vue';
import { Field, Form, type RuleExpression, type SubmissionHandler, type InvalidSubmissionHandler } from 'vee-validate';

/** constants */
import { Regex } from '@module-base/constants/Regex';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { focusInput } from '@module-base/utils/focusInput';

/** hooks */
import { useRegister } from '@module-auth/hooks/useRegister';

/** components */
import InputText from '@module-base/components/InputText.vue';
import InputPassword from '@module-base/components/InputPassword.vue';
import AuthFormButtonSubmit from '@module-auth/components/AuthFormButtonSubmit.vue';
import AuthFormBreadcrumbs from '@module-auth/components/AuthFormBreadcrumbs.vue';

/** type */
import type { TypeInputElem } from '@module-base/types';

type TypeFormFieldsName = 'email' | 'password';
type TypeFormData = {
    [Key in TypeFormFieldsName]: string;
};

const FormFieldsName: Readonly<{ [Key in TypeFormFieldsName]: Key }> = {
    email: 'email',
    password: 'password',
};
const hookRegister = useRegister();

const formFieldsRef = ref<Record<TypeFormFieldsName, TypeInputElem>>({
    [FormFieldsName.email]: null,
    [FormFieldsName.password]: null,
});

const initialValues: TypeFormData = {
    [FormFieldsName.email]: '',
    [FormFieldsName.password]: '',
};

const validateEmail: RuleExpression<unknown> = (email) => {
    const value = email as TypeFormData[typeof FormFieldsName.email];
    if (!value?.trim()) {
        return AuthLanguage.status.email.empty;
    }
    return !Regex.email.test(value) ? AuthLanguage.status.email.invalid : true;
};
const validatePassword: RuleExpression<unknown> = (password) => {
    const value = password as TypeFormData[typeof FormFieldsName.password];
    if (!value?.trim()) {
        return AuthLanguage.status.password.empty;
    }
    return !Regex.password.test(value) ? AuthLanguage.status.password.invalid : true;
};
const onSubmit: SubmissionHandler = (data, { setFieldError }) => {
    hookRegister.mutate(data as TypeFormData, {
        onError: (error) => {
            const code = Number(error.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.register.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            setFieldError(FormFieldsName.email, messageIntl);
            setFieldError(FormFieldsName.password, messageIntl);
            focusInput({ elem: formFieldsRef.value[FormFieldsName.email] });
        },
    });
};
const onSubmitError: InvalidSubmissionHandler = ({ errors }) => {
    const listFieldsCheck: TypeFormFieldsName[] = [FormFieldsName.email, FormFieldsName.password];
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
                :error-messages="errorMessage ? $t(errorMessage) : null"
                :autofocus="true"
                @set-ref="formFieldsRef[FormFieldsName.email] = $event"
                @input="setErrors('')"
                @on-change="handleChange"
            />
        </Field>
        <Field
            v-slot="{ value, handleChange, errorMessage, setErrors }"
            :name="FormFieldsName.password"
            :rules="validatePassword"
        >
            <InputPassword
                :model-value="value"
                :label="$t(AuthLanguage.component.label.password)"
                :error-messages="errorMessage ? $t(errorMessage) : null"
                @set-ref="formFieldsRef[FormFieldsName.password] = $event"
                @input="setErrors('')"
                @on-change="handleChange"
            />
        </Field>
        <AuthFormBreadcrumbs />
        <div class="flex w-full justify-end">
            <AuthFormButtonSubmit
                :text="$t(AuthLanguage.component.button.register)"
                :loading="isValidating || isSubmitting || hookRegister.isPending.value"
            />
        </div>
    </Form>
</template>
