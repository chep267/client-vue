<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** logo */
import Logo from '@root/assets/favicon.svg';
</script>

<template>
    <router-link v-once aria-label="home" to="/">
        <img alt="" :src="Logo" width="40" height="40" rel="preload" loading="lazy" />
    </router-link>
</template>
