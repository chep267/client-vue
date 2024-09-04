<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { RouterLink } from 'vue-router';

/** constants */
import { AppName } from '@module-global/constants/AppName.ts';
</script>

<template>
    <RouterLink v-once to="/">
        {{ AppName }}
    </RouterLink>
</template>
