<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useCookies } from '@vueuse/integrations/useCookies';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { focusInput } from '@module-base/utils/focusInput';
import { authFormSchema } from '@module-auth/utils/authFormSchema';

/** hooks */
import { useSignin } from '@module-auth/hooks/useSignin';

/** components */
import AuthFormTitle from '@module-auth/components/AuthFormTitle.vue';
import InputEmail from '@module-auth/components/InputEmail.vue';
import InputPassword from '@module-auth/components/InputPassword.vue';
import AuthFormButtonSubmit from '@module-auth/components/AuthFormButtonSubmit.vue';
import AuthFormBreadcrumbs from '@module-auth/components/AuthFormBreadcrumbs.vue';

/** type */
import type { AxiosError } from 'axios';

const cookies = useCookies();
const { handleSubmit } = useForm({
    initialValues: {
        email: cookies.get<string>(AppKey.email) || 'dong.nguyenthanh@powergatesoftware.com',
        password: 'Midom@2024',
    },
    validationSchema: authFormSchema,
});
const fieldEmail = useField('email');
const fieldPassword = useField('password');
const SIGN_IN = useSignin();

const inputEmailRef = ref<HTMLInputElement | null>(null);
const inputPasswordRef = ref<HTMLInputElement | null>(null);

const onSubmit = handleSubmit(
    (data) => {
        SIGN_IN.mutate(data, {
            onError: (error: AxiosError) => {
                const code = Number(error?.response?.status);
                let messageIntl;
                switch (true) {
                    case code >= 400 && code < 500:
                        messageIntl = AuthLanguage.notify.signin.error;
                        break;
                    default:
                        messageIntl = AuthLanguage.notify.server.error;
                        break;
                }
                fieldEmail.setErrors(messageIntl);
                fieldPassword.setErrors(messageIntl);
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
    <AuthFormTitle :text="$t(AuthLanguage.component.title.signin)" />
    <v-form
        class="flex flex-col w-10/12 md:max-w-xl gap-y-2 p-6 shadow-lg shadow-gray-500/40 rounded-md z-10"
        @submit.prevent="onSubmit"
    >
        <InputEmail
            v-model="fieldEmail.value.value"
            :autofocus="true"
            :error-messages="fieldEmail.errorMessage.value ? $t(fieldEmail.errorMessage.value) : null"
            @set-ref="(elem) => (inputEmailRef = elem)"
        />
        <InputPassword
            v-model="fieldPassword.value.value"
            :error-messages="fieldPassword.errorMessage.value ? $t(fieldPassword.errorMessage.value) : null"
            @set-ref="(elem) => (inputPasswordRef = elem)"
        />
        <AuthFormBreadcrumbs />
        <div class="flex w-full justify-end">
            <AuthFormButtonSubmit :text="$t(AuthLanguage.component.button.signin)" :loading="SIGN_IN.isPending.value" />
        </div>
    </v-form>
</template>
