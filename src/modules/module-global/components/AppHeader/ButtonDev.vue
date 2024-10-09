<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { mdiBell } from '@mdi/js';

/** constants */
import { NotifyColor } from '@module-base/constants/NotifyColor';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore';

const notifyStore = useNotifyStore();
</script>

<template>
    <v-btn v-once :icon="mdiBell" @click.stop="notifyStore.show({ color: NotifyColor.warning })" />
</template>
