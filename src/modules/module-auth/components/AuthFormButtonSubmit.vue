<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

defineProps<{
    loading?: boolean;
    text?: string;
}>();
</script>

<template>
    <v-btn width="50%" size="large" color="primary" type="submit" :text="text" :loading="loading" />
</template>
