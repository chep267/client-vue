<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { useRoute } from 'vue-router';
import { configure } from 'vee-validate';

/** constants */
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath';

/** components */
import BaseParticles from '@module-base/components/BaseParticles.vue';
import SigninForm from '@module-auth/components/SigninForm.vue';
import RegisterForm from '@module-auth/components/RegisterForm.vue';
import RecoverForm from '@module-auth/components/RecoverForm.vue';

const route = useRoute();

configure({
    bails: false,
    validateOnChange: false,
    validateOnInput: false,
    validateOnModelUpdate: false,
});
</script>

<template>
    <div class="flex flex-col justify-center items-center w-full h-full gap-y-10 auth-form">
        <SigninForm v-if="route.path === AuthScreenPath.signin" />
        <RegisterForm v-else-if="route.path === AuthScreenPath.register" />
        <RecoverForm v-else-if="route.path === AuthScreenPath.recover" />
        <BaseParticles />
    </div>
</template>

<style scoped>
.auth-form:deep(.v-form) {
    background-color: rgb(var(--v-theme-background));
}
</style>
