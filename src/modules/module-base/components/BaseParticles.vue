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
import { computed } from 'vue';

const theme = useTheme();

const isDarkTheme = computed(() => theme.global.name.value === ThemeObject.dark);
</script>

<template>
    <vue-particles v-if="isDarkTheme" id="ts-particles-dark" :options="optionsDark" />
    <vue-particles v-else id="ts-particles-light" :options="optionsLight" />
</template>
