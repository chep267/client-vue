<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { mdiBell } from '@mdi/js';

/** constants */
import { AppNotifyColor } from '@module-base/constants/AppNotifyColor';

/** hooks */
import { useNotifyStore } from '@module-base/hooks/useNotifyStore';

/** components */
import ButtonBase from '@module-base/components/ButtonBase.vue';

const notifyStore = useNotifyStore();
</script>

<template>
    <ButtonBase
        aria-label="dev"
        variant="text"
        class="text-inherit"
        :icon="mdiBell"
        @click.stop="notifyStore.show({ color: AppNotifyColor.warning })"
    />
</template>
