<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { onMounted } from 'vue';

/** hooks */
import { useRestart } from '@module-auth/hooks/useRestart';

/** components */
import StartLoading from '@module-base/components/StartLoading.vue';

const hookRestart = useRestart();

onMounted(() => {
    hookRestart.mutate({});
});
</script>

<template>
    <StartLoading />
</template>
