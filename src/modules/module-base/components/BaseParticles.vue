<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { useTheme } from 'vuetify';

/** constants */
import { optionsLight, optionsDark } from '@module-base/constants/ParticleOptions';
import { themeObject } from '@module-theme/constants/themeObject';

const theme = useTheme();
</script>

<template>
    <vue-particles v-if="theme.global.name.value === themeObject.dark" id="ts-particles-dark" :options="optionsDark" />
    <vue-particles v-else id="ts-particles-light" :options="optionsLight" />
</template>
