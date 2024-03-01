<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useCookies } from '@vueuse/integrations/useCookies';

/** components */
import AuthFormTitle from '@module-auth/components/AuthFormTitle.vue';
import InputEmail from '@module-auth/components/InputEmail.vue';
import InputPassword from '@module-auth/components/InputPassword.vue';
import AuthFormButtonSubmit from '@module-auth/components/AuthFormButtonSubmit.vue';
import AuthFormBreadcrumbs from '@module-auth/components/AuthFormBreadcrumbs.vue';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';

/** utils */
import { focusInput } from '@module-base/utils/focusInput.ts';
import { authFormSchema } from '@module-auth/utils/authFormSchema.ts';

/** hooks */
import { useSignin } from '@module-auth/hooks/useSignin.ts';

const cookies = useCookies();
const { handleSubmit } = useForm({
    initialValues: {
        email: cookies.get<string>(AppKey.email) || 'dong.nguyenthanh@powergatesoftware.com',
        password: 'Midom@2023',
    },
    validationSchema: authFormSchema,
});
const email = useField('email');
const password = useField('password');
const SIGN_IN = useSignin();

const inputEmailRef = ref<HTMLInputElement | null>(null);
const inputPasswordRef = ref<HTMLInputElement | null>(null);

const onSubmit = handleSubmit(
    (data) => SIGN_IN.mutate(data),
    ({ errors }) => {
        focusInput({ elem: errors.email ? inputEmailRef.value : inputPasswordRef.value });
    }
);
</script>

<template>
    <auth-form-title text="module.auth.form.title.signin" />
    <v-form
        class="flex flex-col w-10/12 md:max-w-xl gap-y-2 p-6 shadow-lg shadow-gray-500/40 rounded-md z-10 auth-form"
        @submit.prevent="onSubmit">
        <input-email
            v-model="email.value.value"
            :autofocus="true"
            :set-ref="(elem: HTMLInputElement | null) => (inputEmailRef = elem)"
            :error-messages="email.errorMessage.value ? $t(email.errorMessage.value) : null" />
        <input-password
            v-model="password.value.value"
            :set-ref="(elem: HTMLInputElement | null) => (inputPasswordRef = elem)"
            :error-messages="password.errorMessage.value ? $t(password.errorMessage.value) : null" />
        <auth-form-breadcrumbs />
        <div class="flex w-full justify-end">
            <auth-form-button-submit :text="$t('module.auth.button.signin')" :loading="SIGN_IN.isPending.value" />
        </div>
    </v-form>
</template>
