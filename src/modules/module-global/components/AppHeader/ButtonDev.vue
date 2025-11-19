<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { mdiBell } from '@mdi/js';

/** constants */
import { AppNotifyColor } from '@module-base/constants/AppNotifyColor';

/** hooks */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';

const notifyStore = useNotifyStore();
</script>

<template>
    <v-btn
        aria-label="show tooltip developer mode"
        variant="text"
        class="text-inherit"
        :icon="mdiBell"
        @click.stop="notifyStore.show({ color: AppNotifyColor.warning })"
    />
</template>
