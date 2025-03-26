<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** logo */
import Logo from '@root/assets/favicon.svg';
</script>

<template>
    <router-link v-once aria-label="home" to="/">
        <img alt="" :src="Logo" width="40" height="40" />
    </router-link>
</template>
