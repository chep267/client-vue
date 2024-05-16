<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';

/** components */
import AuthFormTitle from '@module-auth/components/AuthFormTitle.vue';
import InputEmail from '@module-auth/components/InputEmail.vue';
import InputPassword from '@module-auth/components/InputPassword.vue';
import AuthFormButtonSubmit from '@module-auth/components/AuthFormButtonSubmit.vue';
import AuthFormBreadcrumbs from '@module-auth/components/AuthFormBreadcrumbs.vue';

/** utils */
import { focusInput } from '@module-base/utils/focusInput.ts';
import { authFormSchema } from '@module-auth/utils/authFormSchema.ts';

/** hooks */
import { useRegister } from '@module-auth/hooks/useRegister.ts';

const { handleSubmit } = useForm({
    initialValues: {
        email: '',
        password: '',
    },
    validationSchema: authFormSchema,
});
const fieldEmail = useField('email');
const fieldPassword = useField('password');
const REGISTER = useRegister();

const inputEmailRef = ref<HTMLInputElement | null>(null);
const inputPasswordRef = ref<HTMLInputElement | null>(null);

const onSubmit = handleSubmit(
    (data) =>
        REGISTER.mutate(data, {
            onError: () => {
                fieldEmail.setErrors('module.auth.notify.register.error');
                focusInput({ elem: inputEmailRef.value });
            },
        }),
    ({ errors }) => {
        focusInput({ elem: errors.email ? inputEmailRef.value : inputPasswordRef.value });
    }
);
</script>

<template>
    <auth-form-title :text="$t('module.auth.form.title.register')" />
    <v-form
        class="flex flex-col w-10/12 md:max-w-xl gap-y-2 p-6 shadow-lg shadow-gray-500/40 rounded-md z-10 auth-form"
        @submit.prevent="onSubmit">
        <input-email
            v-model="fieldEmail.value.value"
            :autofocus="true"
            :set-ref="(elem: HTMLInputElement | null) => (inputEmailRef = elem)"
            :error-messages="fieldEmail.errorMessage.value ? $t(fieldEmail.errorMessage.value) : null" />
        <input-password
            v-model="fieldPassword.value.value"
            :set-ref="(elem: HTMLInputElement | null) => (inputPasswordRef = elem)"
            :error-messages="fieldPassword.errorMessage.value ? $t(fieldPassword.errorMessage.value) : null" />
        <auth-form-breadcrumbs />
        <div class="flex w-full justify-end">
            <auth-form-button-submit :text="$t('module.auth.button.register')" :loading="REGISTER.isPending.value" />
        </div>
    </v-form>
</template>
