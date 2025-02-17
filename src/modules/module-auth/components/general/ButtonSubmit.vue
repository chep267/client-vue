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
        :class="['font-bold tracking-normal capitalize', 'w-full', 'xs:w-1/3']"
        type="submit"
        color="primary"
        size="large"
        :loading="loading"
    >
        {{ title }}
    </ButtonBase>
</template>
