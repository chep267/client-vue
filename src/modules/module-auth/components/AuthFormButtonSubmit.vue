<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { VBtn } from 'vuetify/components/VBtn';

/** types */
import type { ExtractPropTypes } from 'vue';

interface ButtonProps extends /* @vue-ignore */ Partial<ExtractPropTypes<VBtn>> {
    text: string;
    type?: string;
    width?: string | number;
    color?: string;
    size?: string;
    loading?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
    type: 'submit',
    width: '50%',
    size: 'large',
    color: 'primary',
});
</script>

<template>
    <v-btn v-bind="props" />
</template>
