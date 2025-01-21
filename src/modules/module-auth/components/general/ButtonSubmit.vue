<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** components */
import ButtonBase from '@module-base/components/ButtonBase.vue';

defineOptions({ name: 'ButtonSubmit', inheritAttrs: true });
defineProps<{
    title?: string;
    loading?: boolean;
}>();
</script>

<template>
    <ButtonBase
        class="font-bold capitalize tracking-normal"
        type="submit"
        color="primary"
        size="large"
        width="30%"
        :loading="loading"
    >
        {{ title }}
    </ButtonBase>
</template>
