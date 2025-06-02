<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { reactive } from 'vue';
import { Form, type RuleExpression } from 'vee-validate';
import Cookie from 'js-cookie';
import clsx from 'clsx';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppRegex } from '@module-base/constants/AppRegex';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { focusInput } from '@module-base/utils/focusInput';

/** hooks */
import { useSignin } from '@module-auth/hooks/useSignin';

/** components */
import AuthFormBreadcrumbs from '@module-auth/components/general/AuthFormBreadcrumbs.vue';
import FieldText from '@module-auth/components/general/FieldText.vue';
import FieldPassword from '@module-auth/components/general/FieldPassword.vue';
import ButtonSubmit from '@module-auth/components/general/ButtonSubmit.vue';

/** type */
import type { SubmissionHandler, InvalidSubmissionHandler, FieldContext } from 'vee-validate';

type TypeFormFieldsName = 'email' | 'password';
type TypeFormData = {
    [Key in TypeFormFieldsName]: string;
};
type TypeFormFields = {
    [Field in TypeFormFieldsName]: {
        name: Field;
        elem: App.ModuleBase.Component.InputElement;
    };
};

const hookSignIn = useSignin();

const FormFields = reactive<TypeFormFields>({
    email: {
        name: 'email',
        elem: null,
    },
    password: {
        name: 'password',
        elem: null,
    },
});
const ApiStatus = reactive({
    success: '',
    error: '',
});
const initialValues: TypeFormData = {
    [FormFields.email.name]: Cookie.get(AppKey.email) || 'dong.nguyenthanh@powergatesoftware.com',
    [FormFields.password.name]: 'Midom@2024',
};

const resetError = (setErrors: FieldContext['setErrors']) => {
    ApiStatus.error = '';
    ApiStatus.success = '';
    setErrors('');
};

const updateValue = (value: string, handleChange: FieldContext['handleChange'], setErrors: FieldContext['setErrors']) => {
    resetError(setErrors);
    handleChange(value, false);
};

const updateRef = (elem: App.ModuleBase.Component.InputElement, field: string) => {
    FormFields[field as TypeFormFieldsName].elem = elem;
};

const onSubmit: SubmissionHandler = (data) => {
    if (ApiStatus.error) {
        return focusInput({ elem: FormFields.email.elem });
    }
    hookSignIn.mutate(data as TypeFormData, {
        onError: (error) => {
            const code = Number(error.response?.status);
            switch (true) {
                case code >= 400 && code < 500:
                    ApiStatus.error = AuthLanguage.notify.signin.error;
                    break;
                default:
                    ApiStatus.error = AuthLanguage.notify.server.error;
            }
            focusInput({ elem: FormFields.email.elem });
        },
    });
};

const onSubmitError: InvalidSubmissionHandler = ({ errors }) => {
    const listFieldsCheck: TypeFormFieldsName[] = [FormFields.email.name, FormFields.password.name];
    const field = listFieldsCheck.find((field) => field in errors);
    if (field) {
        focusInput({ elem: FormFields[field].elem });
    }
};

const validateEmail: RuleExpression<unknown> = (value) => {
    const email = value as string;
    if (!email?.trim()) {
        return AuthLanguage.status.email.empty;
    }
    return !AppRegex.email.test(email) ? AuthLanguage.status.email.invalid : true;
};

const validatePassword: RuleExpression<unknown> = (value) => {
    const password = value as string;
    if (!password?.trim()) {
        return AuthLanguage.status.password.empty;
    }
    return !AppRegex.password.test(password) ? AuthLanguage.status.password.invalid : true;
};
</script>

<template>
    <Form
        v-slot="{ isSubmitting, isValidating }"
        as="v-form"
        class="z-1 flex w-full max-w-xl flex-col gap-y-2 overflow-hidden rounded-md p-6 shadow-lg shadow-gray-500/40"
        :initial-values="initialValues"
        :on-submit="onSubmit"
        :on-invalid-submit="onSubmitError"
    >
        <FieldText
            :name="FormFields.email.name"
            :label="AuthLanguage.component.label.email"
            :error-message="ApiStatus.error"
            :rules="validateEmail"
            @update:ref="updateRef"
            @update:model-value="updateValue"
        />
        <FieldPassword
            :name="FormFields.password.name"
            :label="AuthLanguage.component.label.password"
            :error-message="ApiStatus.error"
            :rules="validatePassword"
            @update:ref="updateRef"
            @update:model-value="updateValue"
        />
        <div :class="clsx('flex w-full items-end justify-between gap-2', 'flex-col', 'xs:flex-row')">
            <AuthFormBreadcrumbs />
            <ButtonSubmit
                :loading="isValidating || isSubmitting || hookSignIn.isPending.value"
                :title="$t(AuthLanguage.component.button.signin)"
            />
        </div>
    </Form>
</template>
