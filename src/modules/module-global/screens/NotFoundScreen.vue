<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { defineAsyncComponent } from 'vue';

/** components */
import NotFound from '@module-base/components/NotFound.vue';

/** lazy components */
const BaseParticles = defineAsyncComponent(() => import('@module-base/components/BaseParticles.vue'));
</script>

<template>
    <div class="flex h-full w-full items-center justify-center">
        <not-found class="z-10" width="500" height="500" />
        <base-particles />
    </div>
</template>
