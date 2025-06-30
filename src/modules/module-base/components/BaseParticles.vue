<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useTheme } from 'vuetify';

/** constants */
import { optionsLight, optionsDark } from '@module-base/constants/ParticleOptions';
import { ThemeObject } from '@module-base/constants/ThemeObject';

const theme = useTheme();
</script>

<template>
    <vue-particles v-if="theme.global.name.value === ThemeObject.dark" id="ts-particles-dark" :options="optionsDark" />
    <vue-particles v-else id="ts-particles-light" :options="optionsLight" />
</template>
