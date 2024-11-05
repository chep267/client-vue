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
import { useRecover } from '@module-auth/hooks/useRecover';

/** components */
import InputText from '@module-base/components/InputText.vue';
import AuthFormButtonSubmit from '@module-auth/components/AuthFormButtonSubmit.vue';
import AuthFormBreadcrumbs from '@module-auth/components/AuthFormBreadcrumbs.vue';

/** type */
import type { TypeInputElem, AxiosError } from '@module-base/types';

type TypeFormFieldsName = 'email';
type TypeFormData = {
    [Key in TypeFormFieldsName]: string;
};

const FormFieldsName: Readonly<{ [Key in TypeFormFieldsName]: Key }> = {
    email: 'email',
};
const cookies = useCookies();
const hookRecover = useRecover();

const formFieldsRef = ref<Record<TypeFormFieldsName, TypeInputElem>>({
    [FormFieldsName.email]: null,
});

const initialValues: TypeFormData = {
    [FormFieldsName.email]: cookies.get<string>(AppKey.email) || 'dong.nguyenthanh@powergatesoftware.com',
};

const validateEmail: RuleExpression<unknown> = email => {
    const value = email as TypeFormData[typeof FormFieldsName.email];
    if (!value?.trim()) {
        return AuthLanguage.status.email.empty;
    }
    return !Regex.email.test(value) ? AuthLanguage.status.email.invalid : true;
};
const onSubmit: SubmissionHandler = (data, { setFieldError }) => {
    hookRecover.mutate(data as TypeFormData, {
        onError: (error: AxiosError) => {
            const code = Number(error?.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.recover.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            setFieldError(FormFieldsName.email, messageIntl);
            focusInput({ elem: formFieldsRef.value[FormFieldsName.email] });
        },
    });
};
const onSubmitError: InvalidSubmissionHandler = ({ errors }) => {
    const listFieldsCheck: TypeFormFieldsName[] = [FormFieldsName.email];
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
                :label="$t(AuthLanguage.component.label.email)"
                :autofocus="true"
                :error-messages="errorMessage ? $t(errorMessage) : null"
                @set-ref="formFieldsRef[FormFieldsName.email] = $event"
                @input="setErrors('')"
            />
        </Field>
        <AuthFormBreadcrumbs />
        <div class="flex w-full justify-end">
            <AuthFormButtonSubmit
                :text="$t(AuthLanguage.component.button.recover)"
                :loading="isValidating || isSubmitting || hookRecover.isPending.value"
            />
        </div>
    </Form>
</template>
