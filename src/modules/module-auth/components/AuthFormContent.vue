<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';

/** components */
const SigninForm = defineAsyncComponent(() => import('@module-auth/components/form/SigninForm.vue'));
const RegisterForm = defineAsyncComponent(() => import('@module-auth/components/form/RegisterForm.vue'));
const RecoverForm = defineAsyncComponent(() => import('@module-auth/components/form/RecoverForm.vue'));

const route = useRoute();
</script>

<template>
    <SigninForm v-if="route.path === AuthRouterPath.signin" />
    <RegisterForm v-else-if="route.path === AuthRouterPath.register" />
    <RecoverForm v-else-if="route.path === AuthRouterPath.recover" />
</template>
