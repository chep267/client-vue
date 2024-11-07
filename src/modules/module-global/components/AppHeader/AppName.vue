<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { RouterLink } from 'vue-router';

/** constants */
import { AppEnv } from '@module-base/constants/AppEnv';
</script>

<template>
    <RouterLink v-once to="/">
        {{ AppEnv.appName }}
    </RouterLink>
</template>
