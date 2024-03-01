<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { ref, onMounted } from 'vue';

/** icons */
import { mdiAccount } from '@mdi/js';

/** type */
import type { VTextField } from 'vuetify/components/VTextField';

const props = defineProps<{
    autofocus?: boolean;
    errorMessages: VTextField['errorMessages'];
    setRef?(elem: HTMLInputElement | null): void;
}>();

const inputRef = ref(null);

onMounted(() => {
    props.setRef?.(inputRef.value);
});
</script>

<template>
    <v-text-field
        ref="inputRef"
        :label="$t('module.auth.input.label.email')"
        type="text"
        variant="outlined"
        :autocomplete="false"
        :spellcheck="false"
        :autofocus="autofocus"
        :prepend-inner-icon="mdiAccount"
        :error-messages="errorMessages" />
</template>
