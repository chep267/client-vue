<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage.ts';

/** utils */
import { focusInput } from '@module-base/utils/focusInput.ts';
import { authFormSchema } from '@module-auth/utils/authFormSchema.ts';

/** hooks */
import { useRegister } from '@module-auth/hooks/useRegister.ts';

/** components */
import AuthFormTitle from '@module-auth/components/AuthFormTitle.vue';
import InputEmail from '@module-auth/components/InputEmail.vue';
import InputPassword from '@module-auth/components/InputPassword.vue';
import AuthFormButtonSubmit from '@module-auth/components/AuthFormButtonSubmit.vue';
import AuthFormBreadcrumbs from '@module-auth/components/AuthFormBreadcrumbs.vue';

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
    (data) => {
        REGISTER.mutate(data, {
            onError: () => {
                fieldEmail.setErrors(AuthLanguage.notify.register.error);
                focusInput({ elem: inputEmailRef.value });
            },
        });
    },
    ({ errors }) => {
        focusInput({ elem: errors.email ? inputEmailRef.value : inputPasswordRef.value });
    }
);
</script>

<template>
    <AuthFormTitle :text="$t(AuthLanguage.component.title.register)" />
    <v-form
        class="flex flex-col w-10/12 md:max-w-xl gap-y-2 p-6 shadow-lg shadow-gray-500/40 rounded-md z-10"
        @submit.prevent="onSubmit"
    >
        <InputEmail
            v-model="fieldEmail.value.value"
            :autofocus="true"
            :error-messages="fieldEmail.errorMessage.value ? $t(fieldEmail.errorMessage.value) : null"
            @set-ref="(elem: HTMLInputElement | null) => (inputEmailRef = elem)"
        />
        <InputPassword
            v-model="fieldPassword.value.value"
            :error-messages="fieldPassword.errorMessage.value ? $t(fieldPassword.errorMessage.value) : null"
            @set-ref="(elem: HTMLInputElement | null) => (inputPasswordRef = elem)"
        />
        <AuthFormBreadcrumbs />
        <div class="flex w-full justify-end">
            <AuthFormButtonSubmit :text="$t(AuthLanguage.component.button.register)" :loading="REGISTER.isPending.value" />
        </div>
    </v-form>
</template>
