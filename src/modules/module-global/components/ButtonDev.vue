<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** icons */
import { mdiBell } from '@mdi/js';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore.ts';

const notifyStore = useNotifyStore();
</script>

<template>
    <v-btn :icon="mdiBell" @click="() => notifyStore.show({ color: 'warning' })" />
</template>
