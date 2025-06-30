<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

import { watchEffect } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

watchEffect(() => {
    if (theme.global.current.value.dark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});
</script>

<template>
    <v-theme-provider><slot /></v-theme-provider>
</template>
