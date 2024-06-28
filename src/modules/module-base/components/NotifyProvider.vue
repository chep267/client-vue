<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { storeToRefs } from 'pinia';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore.ts';

const notifyStore = useNotifyStore();
const { open, message, messageIntl, location, duration, color } = storeToRefs(notifyStore);
</script>

<template>
    <v-snackbar
        v-model="open"
        v-memo="[open]"
        class="top-16"
        :multi-line="true"
        :location="location"
        :timeout="duration"
        :color="color"
        elevation="24">
        <span v-if="messageIntl">{{ $t(messageIntl) }}</span>
        <span v-else>{{ message }}</span>
    </v-snackbar>
    <slot />
</template>
