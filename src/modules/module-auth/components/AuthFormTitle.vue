<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { useTheme } from 'vuetify';

defineProps<{
    text?: string;
}>();

const theme = useTheme();
</script>

<template>
    <span :class="{ 'text-4xl z-10': true, 'form-title': theme.global.name.value === 'light' }">
        {{ text ? $t(text) : '' }}
    </span>
</template>

<style scoped>
.form-title {
    color: rgb(var(--v-theme-info));
}
</style>
