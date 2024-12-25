<script setup lang="ts">
/** libs */
import { mdiAlertOutline } from '@mdi/js';
</script>

<template>
    <v-alert
        v-bind.attr="$attrs"
        class="notify-error font-arial font-normal text-bs-body-color bg-bs-alert-bg-color"
        :icon="mdiAlertOutline"
    >
        <slot />
    </v-alert>
</template>

<style lang="scss" scoped>
.notify-error {
    border: 1px solid rgba(var(--v-theme-error), 1);
    &:deep(.v-icon__svg) {
        color: rgba(var(--v-theme-error), 1);
    }
    &:deep(a) {
        cursor: pointer;
        &:hover {
            color: rgba(var(--v-theme-main), 1);
            text-decoration: underline;
        }
    }
}
</style>
