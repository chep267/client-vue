<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { RouterLink } from 'vue-router';

/** logo */
import Logo from '@root/assets/favicon.svg';
</script>

<template>
    <RouterLink v-once to="/">
        <img alt="" :src="Logo" width="40" height="40" />
    </RouterLink>
</template>
