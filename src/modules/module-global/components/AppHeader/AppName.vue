<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { AppEnv } from '@module-base/constants/AppEnv';
</script>

<template>
    <router-link v-once to="/">
        {{ AppEnv.appName }}
    </router-link>
</template>
