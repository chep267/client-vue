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
import { useRecover } from '@module-auth/hooks/useRecover.ts';

const { handleSubmit } = useForm({
    initialValues: {
        email: 'dong.nguyenthanh@powergatesoftware.com',
        password: 'Midom@2024',
    },
    validationSchema: authFormSchema,
});
const fieldEmail = useField('email');
const RECOVER = useRecover();

const inputEmailRef = ref<HTMLInputElement | null>(null);

const onSubmit = handleSubmit(
    (data) => {
        RECOVER.mutate(data, {
            onError: () => {
                fieldEmail.setErrors('module.auth.notify.recover.error');
                focusInput({ elem: inputEmailRef.value });
            },
        });
    },
    () => {
        focusInput({ elem: inputEmailRef.value });
    }
);
</script>

<template>
    <AuthFormTitle :text="$t('module.auth.form.title.recover')" />
    <v-form
        class="flex flex-col w-10/12 md:max-w-xl gap-y-2 p-6 shadow-lg shadow-gray-500/40 rounded-md z-10"
        @submit.prevent="onSubmit">
        <InputEmail
            v-model="fieldEmail.value.value"
            :autofocus="true"
            :error-messages="fieldEmail.errorMessage.value ? $t(fieldEmail.errorMessage.value) : null"
            @set-ref="(elem: HTMLInputElement | null) => (inputEmailRef = elem)" />
        <AuthFormBreadcrumbs />
        <div class="flex w-full justify-end">
            <AuthFormButtonSubmit :text="$t('module.auth.button.recover')" :loading="RECOVER.isPending.value" />
        </div>
    </v-form>
</template>
