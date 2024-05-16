<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { type ExtractPropTypes } from 'vue';

/** components */
import { VBtn } from 'vuetify/components/VBtn';

interface ButtonProps extends /* @vue-ignore */ Partial<ExtractPropTypes<VBtn>> {}

defineProps<ButtonProps>();
</script>

<template>
    <v-btn width="50%" size="large" color="primary" type="submit" />
</template>
