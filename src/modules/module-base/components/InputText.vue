<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { onMounted, useTemplateRef } from 'vue';
import { VTextField } from 'vuetify/components/VTextField';

/** types */
import type { TypeInputElem, InputTextProps, InputTextSlots } from '@module-base/types';

defineOptions({ name: 'InputText', extends: VTextField, inheritAttrs: true });
defineProps<InputTextProps>();
const emits = defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
    (e: 'update:model-value', value: string): void;
}>();
defineSlots<InputTextSlots>();

const inputRef = useTemplateRef<TypeInputElem>('input-ref');

onMounted(() => emits('update:ref', inputRef.value));
</script>

<template>
    <v-text-field
        ref="input-ref"
        v-bind.prop="$props"
        v-bind.attr="$attrs"
        :spellcheck="false"
        autocomplete="off"
        variant="outlined"
        class="dongntd align-content-center cursor-pointer text-3xl"
        @update:model-value="$emit('update:model-value', $event)"
    >
        <!-- Forward slots -->
        <template v-for="(_slotContent, slotName) in $slots as InputTextSlots" :key="slotName" #[slotName]="slotProps">
            <!-- @vue-ignore -->
            <slot :name="slotName" v-bind="{ ...slotProps }" />
        </template>
    </v-text-field>
</template>

<style lang="scss" scoped>
:deep(.v-input__details) {
    padding-inline: 0;
    .v-messages__message {
        text-align: right;
    }
}
</style>
