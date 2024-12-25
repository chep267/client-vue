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
import { useSignin } from '@module-auth/hooks/useSignin';

/** components */
import InputText from '@module-base/components/InputText.vue';
import InputPassword from '@module-base/components/InputPassword.vue';
import ButtonBase from '@module-base/components/ButtonBase.vue';
import AuthFormBreadcrumbs from '@module-auth/components/AuthFormBreadcrumbs.vue';

/** type */
import type { RuleExpression, SubmissionHandler, InvalidSubmissionHandler, FieldContext } from 'vee-validate';
import type { TypeInputElem } from '@module-base/types';

type TypeFormFieldsName = 'email' | 'password';
type TypeFormData = {
    [Key in TypeFormFieldsName]: string;
};

const FormFieldsName: Readonly<{ [Key in TypeFormFieldsName]: Key }> = {
    email: 'email',
    password: 'password',
};

const hookSignIn = useSignin();

const formFieldsRef = ref<Record<TypeFormFieldsName, TypeInputElem>>({
    [FormFieldsName.email]: null,
    [FormFieldsName.password]: null,
});
const errorStatus = ref('');

const initialValues: TypeFormData = {
    [FormFieldsName.email]: Cookie.get(AppKey.email) || 'dong.nguyenthanh@powergatesoftware.com',
    [FormFieldsName.password]: 'Midom@2024',
};

const validateEmail: RuleExpression<unknown> = (value) => {
    const email = value as TypeFormData[typeof FormFieldsName.email];
    if (!email?.trim()) {
        return AuthLanguage.status.email.empty;
    }
    return !Regex.email.test(email) ? AuthLanguage.status.email.invalid : true;
};
const validatePassword: RuleExpression<unknown> = (value) => {
    const password = value as TypeFormData[typeof FormFieldsName.password];
    if (!password?.trim()) {
        return AuthLanguage.status.password.empty;
    }
    return !Regex.password.test(password) ? AuthLanguage.status.password.invalid : true;
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
    hookSignIn.mutate(data as TypeFormData, {
        onError: (error) => {
            const code = Number(error.response?.status);
            switch (true) {
                case code >= 400 && code < 500:
                    errorStatus.value = AuthLanguage.notify.signin.error;
                    break;
                default:
                    errorStatus.value = AuthLanguage.notify.server.error;
            }
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
                :error-messages="errorMessage || errorStatus ? $t(errorMessage || errorStatus) : null"
                :autofocus="true"
                @update:ref="formFieldsRef[FormFieldsName.email] = $event"
                @update:model-value="handleInputChange($event, handleChange, handleResetError(setErrors))"
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
                :error-messages="errorMessage || errorStatus ? $t(errorMessage || errorStatus) : null"
                @update:ref="formFieldsRef[FormFieldsName.password] = $event"
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
                :loading="isValidating || isSubmitting || hookSignIn.isPending.value"
            >
                {{ $t(AuthLanguage.component.button.signin) }}
            </ButtonBase>
        </div>
    </Form>
</template>
