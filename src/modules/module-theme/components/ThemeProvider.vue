<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

import { watchEffect } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

watchEffect(() => {
    if (theme.global.current.value.dark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});
</script>

<template>
    <v-theme-provider><slot /></v-theme-provider>
</template>
