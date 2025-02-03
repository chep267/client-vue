<script setup lang="ts">
/** libs */
import { onMounted, ref } from 'vue';
import { VSelect } from 'vuetify/components/VSelect';

/** types */
import type { SelectFieldProps, SelectFieldSlots, TypeInputElem } from '@module-base/types';

defineOptions({ name: 'SelectField', extends: VSelect, inheritAttrs: true });
defineProps<SelectFieldProps>();
const emits = defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
    (e: 'update:model-value', value: string): void;
}>();
defineSlots<SelectFieldSlots>();

const inputRef = ref<TypeInputElem>(null);

onMounted(() => emits('update:ref', inputRef.value));
</script>

<template>
    <v-select
        ref="inputRef"
        v-bind.prop="$props"
        v-bind.attr="$attrs"
        :spellcheck="false"
        autocomplete="off"
        variant="outlined"
        @update:model-value="$emit('update:model-value', $event)"
    >
        <!-- Forward slots -->
        <template v-for="(_slotContent, slotName) in $slots as SelectFieldSlots" #[slotName]="slotProps">
            <!-- @vue-ignore -->
            <slot :name="slotName" v-bind="{ ...slotProps }" />
        </template>
    </v-select>
</template>
