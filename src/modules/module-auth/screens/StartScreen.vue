<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { onMounted } from 'vue';

/** components */
import StartLoading from '@module-base/components/StartLoading.vue';

/** hooks */
import { useRestart } from '@module-auth/hooks/useRestart.ts';

const RESTART = useRestart();

onMounted(() => {
    RESTART.mutate({});
});
</script>

<template>
    <start-loading />
</template>
