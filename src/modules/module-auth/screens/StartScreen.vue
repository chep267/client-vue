<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
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
