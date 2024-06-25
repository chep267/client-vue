<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { RouterLink } from 'vue-router';

/** logo */
import Logo from '@root/assets/favicon.svg';
</script>

<template>
    <RouterLink v-once to="/"><img alt="" class="ml-1" :src="Logo" width="40" height="40" /></RouterLink>
</template>
