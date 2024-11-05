<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { useRoute } from 'vue-router';

/** constants */
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath';

/** components */
import SigninForm from '@module-auth/components/SigninForm.vue';
import RegisterForm from '@module-auth/components/RegisterForm.vue';
import RecoverForm from '@module-auth/components/RecoverForm.vue';

const route = useRoute();
</script>

<template>
    <SigninForm v-if="route.path === AuthScreenPath.signin" />
    <RegisterForm v-else-if="route.path === AuthScreenPath.register" />
    <RecoverForm v-else-if="route.path === AuthScreenPath.recover" />
</template>
