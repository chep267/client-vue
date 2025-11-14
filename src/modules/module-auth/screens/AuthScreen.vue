<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { defineAsyncComponent } from 'vue';
import { configure } from 'vee-validate';
import { useRoute } from 'vue-router';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import clsx from 'clsx';

/** components */
const SigninForm = defineAsyncComponent(() => import('@module-auth/components/form/SigninForm.vue'));
const RegisterForm = defineAsyncComponent(() => import('@module-auth/components/form/RegisterForm.vue'));
const RecoverForm = defineAsyncComponent(() => import('@module-auth/components/form/RecoverForm.vue'));

/** lazy components */
const BaseParticles = defineAsyncComponent(() => import('@module-base/components/BaseParticles.vue'));

configure({
    bails: false,
    validateOnChange: false,
    validateOnInput: false,
    validateOnModelUpdate: false,
    validateOnBlur: true,
});

const route = useRoute();
</script>

<template>
    <div :class="clsx('flex flex-col items-center justify-center', 'h-full w-full gap-10', 'auth-form')">
        <SigninForm v-if="route.path === AuthRouterPath.signin" />
        <RegisterForm v-else-if="route.path === AuthRouterPath.register" />
        <RecoverForm v-else-if="route.path === AuthRouterPath.recover" />
        <BaseParticles />
    </div>
</template>

<style scoped lang="scss">
.auth-form:deep(.v-form) {
    background-color: rgb(var(--v-theme-background));
}
</style>
