<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { reactive } from 'vue';
import { Form } from 'vee-validate';
import clsx from 'clsx';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { focusInput } from '@module-base/utils/focusInput';

/** hooks */
import { useRegister } from '@module-auth/hooks/useRegister';

/** components */
import AuthFormBreadcrumbs from '@module-auth/components/general/AuthFormBreadcrumbs.vue';
import FieldEmail from '@module-auth/components/general/FieldEmail.vue';
import FieldPassword from '@module-auth/components/general/FieldPassword.vue';
import ButtonSubmit from '@module-auth/components/general/ButtonSubmit.vue';

/** type */
import type { SubmissionHandler, InvalidSubmissionHandler, FieldContext } from 'vee-validate';
import type { TypeInputElem } from '@module-base/types';

type TypeFormFieldsName = 'email' | 'password';
type TypeFormData = {
    [Key in TypeFormFieldsName]: string;
};

const hookRegister = useRegister();

const FormFields = reactive<{
    [Field in TypeFormFieldsName]: {
        name: Field;
        elem: TypeInputElem;
    };
}>({
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

const resetError = (setErrors: FieldContext['setErrors']) => {
    ApiStatus.error = '';
    ApiStatus.success = '';
    setErrors('');
};

const updateValue = (value: string, handleChange: FieldContext['handleChange'], setErrors: FieldContext['setErrors']) => {
    resetError(setErrors);
    handleChange(value, false);
};

const updateRef = (elem: TypeInputElem, field: string) => {
    FormFields[field as TypeFormFieldsName].elem = elem;
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
            }
            focusInput({ elem: FormFields.password.elem });
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
</script>

<template>
    <Form
        v-slot="{ isSubmitting, isValidating }"
        as="v-form"
        class="z-1 flex w-full max-w-xl flex-col gap-y-2 rounded-md p-6 shadow-lg shadow-gray-500/40"
        :initial-values="initialValues"
        :on-submit="onSubmit"
        :on-invalid-submit="onSubmitError"
    >
        <FieldEmail
            :name="FormFields.email.name"
            :error="Boolean(ApiStatus.error)"
            :error-message="ApiStatus.error"
            @update:ref="updateRef"
            @update:model-value="updateValue"
        />
        <FieldPassword
            :name="FormFields.password.name"
            :error="Boolean(ApiStatus.error)"
            :error-message="ApiStatus.error"
            @update:ref="updateRef"
            @update:model-value="updateValue"
        />
        <div :class="clsx('flex w-full items-end justify-between gap-2', 'flex-col', 'xs:flex-row')">
            <AuthFormBreadcrumbs />
            <ButtonSubmit
                :loading="isValidating || isSubmitting || hookRegister.isPending.value"
                :title="$t(AuthLanguage.component.button.signin)"
            />
        </div>
    </Form>
</template>
