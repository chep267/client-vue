<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { ref } from 'vue';
import { Field, Form, type RuleExpression, type SubmissionHandler, type InvalidSubmissionHandler } from 'vee-validate';
import { useCookies } from '@vueuse/integrations/useCookies';

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
import AuthFormButtonSubmit from '@module-auth/components/AuthFormButtonSubmit.vue';
import AuthFormBreadcrumbs from '@module-auth/components/AuthFormBreadcrumbs.vue';

/** type */
import type { TypeInputElem, AxiosError } from '@module-base/types';

type TypeFormFieldsName = 'email' | 'password';
type TypeFormData = {
    [Key in TypeFormFieldsName]: string;
};

const FormFieldsName: Readonly<{ [Key in TypeFormFieldsName]: Key }> = {
    email: 'email',
    password: 'password',
};
const cookies = useCookies();
const hookSignIn = useSignin();

const formFieldsRef = ref<Record<TypeFormFieldsName, TypeInputElem>>({
    [FormFieldsName.email]: null,
    [FormFieldsName.password]: null,
});

const initialValues: TypeFormData = {
    [FormFieldsName.email]: cookies.get<string>(AppKey.email) || 'dong.nguyenthanh@powergatesoftware.com',
    [FormFieldsName.password]: 'Midom@2024',
};

const validateEmail: RuleExpression<unknown> = email => {
    const value = email as TypeFormData[typeof FormFieldsName.email];
    if (!value?.trim()) {
        return AuthLanguage.status.email.empty;
    }
    return !Regex.email.test(value) ? AuthLanguage.status.email.invalid : true;
};
const validatePassword: RuleExpression<unknown> = password => {
    const value = password as TypeFormData[typeof FormFieldsName.password];
    if (!value?.trim()) {
        return AuthLanguage.status.password.empty;
    }
    return !Regex.password.test(value) ? AuthLanguage.status.password.invalid : true;
};
const onSubmit: SubmissionHandler = (data, { setFieldError }) => {
    hookSignIn.mutate(data as TypeFormData, {
        onError: (error: AxiosError) => {
            const code = Number(error?.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.signin.error;
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
    const field = listFieldsCheck.find(field => field in errors);
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
        <Field :name="FormFieldsName.email" v-slot="{ field, errorMessage, setErrors }" :rules="validateEmail">
            <InputText
                v-bind="field"
                :autofocus="true"
                :error-messages="errorMessage ? $t(errorMessage) : null"
                @set-ref="formFieldsRef[FormFieldsName.email] = $event"
                @input="setErrors('')"
            />
        </Field>
        <Field :name="FormFieldsName.password" v-slot="{ field, errorMessage, setErrors }" :rules="validatePassword">
            <InputPassword
                v-bind="field"
                :error-messages="errorMessage ? $t(errorMessage) : null"
                @set-ref="formFieldsRef[FormFieldsName.password] = $event"
                @input="setErrors('')"
            />
        </Field>
        <AuthFormBreadcrumbs />
        <div class="flex w-full justify-end">
            <AuthFormButtonSubmit
                :text="$t(AuthLanguage.component.button.signin)"
                :loading="isValidating || isSubmitting || hookSignIn.isPending.value"
            />
        </div>
    </Form>
</template>
