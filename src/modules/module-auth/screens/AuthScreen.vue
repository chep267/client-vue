<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { useRoute } from 'vue-router';

/** components */
import BaseParticles from '@module-base/components/BaseParticles.vue';
import SigninForm from '@module-auth/components/SigninForm.vue';
import RegisterForm from '@module-auth/components/RegisterForm.vue';
import RecoverForm from '@module-auth/components/RecoverForm.vue';

/** constants */
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath.ts';

const route = useRoute();
</script>

<template>
    <div class="flex flex-col justify-center items-center w-full h-full gap-y-10">
        <signin-form v-if="route.path === AuthScreenPath.signin" />
        <register-form v-else-if="route.path === AuthScreenPath.register" />
        <recover-form v-else-if="route.path === AuthScreenPath.recover" />
        <template v-else />
        <base-particles />
    </div>
</template>

<style>
.auth-form {
    background-color: rgb(var(--v-theme-background));
}
</style>
