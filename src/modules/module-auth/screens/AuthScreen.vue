<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { defineAsyncComponent } from 'vue';
import { configure } from 'vee-validate';

/** components */
import AuthFormTitle from '@module-auth/components/AuthFormTitle.vue';
import AuthFormContent from '@module-auth/components/AuthFormContent.vue';

/** lazy components */
const BaseParticles = defineAsyncComponent(() => import('@module-base/components/BaseParticles.vue'));

configure({
    bails: false,
    validateOnChange: false,
    validateOnInput: false,
    validateOnModelUpdate: false,
    validateOnBlur: true,
});
</script>

<template>
    <div class="auth-form flex h-full w-full flex-col items-center justify-center gap-10">
        <AuthFormTitle />
        <AuthFormContent />
        <BaseParticles />
    </div>
</template>

<style scoped lang="scss">
.auth-form:deep(.v-form) {
    background-color: rgb(var(--v-theme-background));
}
</style>
