<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { reactive } from 'vue';
import { Form } from 'vee-validate';
import clsx from 'clsx';

/** constants */
import { AppRegex } from '@module-base/constants/AppRegex';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { focusInput } from '@module-base/utils/focusInput';
import { debounce } from '@module-base/utils/debounce';

/** hooks */
import { useRegister } from '@module-auth/hooks/useRegister';

/** components */
import AuthFormTitle from '@module-auth/components/general/AuthFormTitle.vue';
import AuthFormBreadcrumbs from '@module-auth/components/general/AuthFormBreadcrumbs.vue';
import FieldText from '@module-auth/components/general/FieldText.vue';
import FieldPassword from '@module-auth/components/general/FieldPassword.vue';
import ButtonSubmit from '@module-auth/components/general/ButtonSubmit.vue';

/** type */
import type { SubmissionHandler, InvalidSubmissionHandler, FieldContext, RuleExpression } from 'vee-validate';

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

const hookRegister = useRegister();

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
    [FormFields.email.name]: '',
    [FormFields.password.name]: '',
};

const resetError = (setErrors?: FieldContext['setErrors']) => {
    ApiStatus.error = '';
    ApiStatus.success = '';
    setErrors?.('');
};

const updateValue = (
    value: string,
    handleChange: FieldContext['handleChange'],
    setErrors: FieldContext['setErrors']
) => {
    resetError(setErrors);
    handleChange(value, false);
};

const onSubmit: SubmissionHandler = (data) => {
    if (ApiStatus.error) {
        return focusInput({ elem: FormFields.email.elem });
    }
    hookRegister.mutate(data as TypeFormData, {
        onError: (error) => {
            const code = Number(error.response?.status);
            switch (true) {
                case code >= 400 && code < 500:
                    ApiStatus.error = AuthLanguage.notify.signin.error;
                    break;
                default:
                    ApiStatus.error = AuthLanguage.notify.server.error;
                    debounce(AppTimer.notifyDuration, resetError)();
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
        :class="
            clsx(
                'flex flex-col',
                'w-full max-w-xl',
                'z-1 gap-y-2 rounded-md p-6',
                'overflow-hidden shadow-lg shadow-gray-500/40'
            )
        "
        :initial-values="initialValues"
        :on-submit="onSubmit"
        :on-invalid-submit="onSubmitError"
    >
        <AuthFormTitle class="mb-5" />
        <FieldText
            :name="FormFields.email.name"
            :label="$t(AuthLanguage.component.label.email)"
            :error="Boolean(ApiStatus.error)"
            :error-message="ApiStatus.error"
            :rules="validateEmail"
            @update:ref="FormFields[FormFields.email.name].elem = $event"
            @update:model-value="updateValue"
        />
        <FieldPassword
            :name="FormFields.password.name"
            :label="$t(AuthLanguage.component.label.password)"
            :error="Boolean(ApiStatus.error)"
            :error-message="ApiStatus.error"
            :rules="validatePassword"
            @update:ref="FormFields[FormFields.password.name].elem = $event"
            @update:model-value="updateValue"
        />
        <div :class="clsx('flex items-end justify-between', 'w-full gap-2', 'flex-col', 'xs:flex-row')">
            <AuthFormBreadcrumbs />
            <ButtonSubmit
                :loading="isValidating || isSubmitting || hookRegister.isPending.value"
                :title="$t(AuthLanguage.component.button.signin)"
            />
        </div>
    </Form>
</template>
