<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { watchEffect } from 'vue';
import { useTheme } from 'vuetify';

/** constants */
import { ThemeObject } from '@module-base/constants/ThemeObject';

const theme = useTheme();

watchEffect(() => {
    const value = theme.global.current.value.dark ? ThemeObject.dark : ThemeObject.light;
    document.documentElement.setAttribute('data-theme', value);
});
</script>

<template>
    <v-theme-provider><slot /></v-theme-provider>
</template>
