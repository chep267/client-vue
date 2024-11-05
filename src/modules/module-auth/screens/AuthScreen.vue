<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { configure } from 'vee-validate';

/** components */
import BaseParticles from '@module-base/components/BaseParticles.vue';
import AuthFormTitle from '@module-auth/components/AuthFormTitle.vue';
import AuthFormContent from '@module-auth/components/AuthFormContent.vue';

configure({
    bails: false,
    validateOnChange: false,
    validateOnInput: false,
    validateOnModelUpdate: false,
    validateOnBlur: true,
});
</script>

<template>
    <div class="flex flex-col justify-center items-center w-full h-full gap-y-10 auth-form">
        <AuthFormTitle />
        <AuthFormContent />
        <BaseParticles />
    </div>
</template>

<style scoped>
.auth-form:deep(.v-form) {
    background-color: rgb(var(--v-theme-background));
}
</style>
