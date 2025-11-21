<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { reactive } from 'vue';
import { Form } from 'vee-validate';
import Cookie from 'js-cookie';
import clsx from 'clsx';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppRegex } from '@module-base/constants/AppRegex';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { focusInput } from '@module-base/utils/focusInput';
import { delay } from '@module-base/utils/delay';
import { isCallApiErrorByClient } from '@module-base/utils/isClientCallApiError';

/** hooks */
import { useRecover } from '@module-auth/hooks/useRecover';

/** components */
import AuthFormTitle from '@module-auth/components/general/AuthFormTitle.vue';
import AuthFormBreadcrumbs from '@module-auth/components/general/AuthFormBreadcrumbs.vue';
import FieldText from '@module-auth/components/general/FieldText.vue';
import ButtonSubmit from '@module-auth/components/general/ButtonSubmit.vue';

/** type */
import type { SubmissionHandler, InvalidSubmissionHandler, FieldContext, RuleExpression } from 'vee-validate';

type TypeFormFieldsName = 'email';
type TypeFormData = {
    [Key in TypeFormFieldsName]: string;
};
type TypeFormFields = {
    [Field in TypeFormFieldsName]: {
        name: Field;
        elem: App.ModuleBase.Component.InputElement;
    };
};

const hookRecover = useRecover();

const FormFields = reactive<TypeFormFields>({
    email: {
        name: 'email',
        elem: null,
    },
});
const ApiStatus = reactive({
    success: '',
    error: '',
});
const initialValues: TypeFormData = {
    [FormFields.email.name]: Cookie.get(AppKey.email) || '',
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
    hookRecover.mutate(data as TypeFormData, {
        onError: (error) => {
            switch (true) {
                case isCallApiErrorByClient(error):
                    ApiStatus.error = AuthLanguage.notify.signin.error;
                    break;
                default:
                    ApiStatus.error = AuthLanguage.notify.server.error;
                    delay(AppTimer.notifyDuration, resetError);
            }
            focusInput({ elem: FormFields.email.elem });
        },
    });
};

const onSubmitError: InvalidSubmissionHandler = ({ errors }) => {
    const listFieldsCheck: TypeFormFieldsName[] = [FormFields.email.name];
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
        <div :class="clsx('flex items-end justify-between', 'w-full gap-2', 'flex-col', 'xs:flex-row')">
            <AuthFormBreadcrumbs />
            <ButtonSubmit
                :loading="isValidating || isSubmitting || hookRecover.isPending.value"
                :title="$t(AuthLanguage.component.button.signin)"
            />
        </div>
    </Form>
</template>
