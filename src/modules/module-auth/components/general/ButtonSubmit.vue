<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import clsx from 'clsx';

defineOptions({ name: 'ButtonSubmit', inheritAttrs: true });
defineProps<{
    title?: string;
    loading?: boolean;
}>();
</script>

<template>
    <v-btn
        aria-label="submit form"
        type="submit"
        size="large"
        :class="clsx('bg-tw-primary cursor-pointer font-bold tracking-normal capitalize', 'w-full', 'xs:w-1/3')"
        :loading="loading"
        :text="title"
    />
</template>
