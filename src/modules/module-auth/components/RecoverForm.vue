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
import AuthFormButtonSubmit from '@module-auth/components/AuthFormButtonSubmit.vue';
import AuthFormBreadcrumbs from '@module-auth/components/AuthFormBreadcrumbs.vue';

/** utils */
import { focusInput } from '@module-base/utils/focusInput.ts';
import { authFormSchema } from '@module-auth/utils/authFormSchema.ts';

/** hooks */
import { useSignin } from '@module-auth/hooks/useSignin.ts';

const { handleSubmit } = useForm({
    initialValues: {
        email: '',
        password: 'Midom@2024',
    },
    validationSchema: authFormSchema,
});
const email = useField('email');
const SIGN_IN = useSignin();

const inputEmailRef = ref<HTMLInputElement | null>(null);

const onSubmit = handleSubmit(
    (data) => {
        console.log('register: ', data);
        // call register
    },
    () => {
        focusInput({ elem: inputEmailRef.value });
    }
);
</script>

<template>
    <auth-form-title text="module.auth.form.title.recover" />
    <v-form
        class="flex flex-col w-10/12 md:max-w-xl gap-y-2 p-6 shadow-lg shadow-gray-500/40 rounded-md z-10 auth-form"
        @submit.prevent="onSubmit">
        <input-email
            v-model="email.value.value"
            :autofocus="true"
            :set-ref="(elem: HTMLInputElement | null) => (inputEmailRef = elem)"
            :error-messages="email.errorMessage.value ? $t(email.errorMessage.value) : null" />
        <auth-form-breadcrumbs />
        <div class="flex w-full justify-end">
            <auth-form-button-submit :text="$t('module.auth.button.recover')" :loading="SIGN_IN.isPending.value" />
        </div>
    </v-form>
</template>
