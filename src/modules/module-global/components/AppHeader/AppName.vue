<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { RouterLink } from 'vue-router';

/** constants */
import { AppName } from '@module-global/constants/AppName.ts';
</script>

<template>
    <router-link to="/">{{ AppName }}</router-link>
</template>
