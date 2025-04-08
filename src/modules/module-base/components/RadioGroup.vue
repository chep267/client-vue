<script setup lang="ts">
/** libs */
import { ref, onMounted } from 'vue';
import { VRadioGroup } from 'vuetify/components/VRadioGroup';

/** types */
import type { TypeInputElem, RadioGroupProps, RadioGroupSlots } from '@module-base/types';

defineOptions({ name: 'RadioGroup', extends: VRadioGroup, inheritAttrs: true });
defineProps<RadioGroupProps>();
const emits = defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
    (e: 'update:model-value', value: any): void;
}>();
defineSlots<RadioGroupSlots>();

const inputRef = ref<TypeInputElem>(null);

onMounted(() => emits('update:ref', inputRef.value));
</script>

<template>
    <v-radio-group
        ref="input-ref"
        v-bind.prop="$props"
        v-bind.attr="$attrs"
        @update:model-value="$emit('update:model-value', $event)"
    >
        <!-- Forward slots -->
        <template v-for="(_slotContent, slotName) in $slots as RadioGroupSlots" :key="slotName" #[slotName]="slotProps">
            <!-- @vue-ignore -->
            <slot :name="slotName" v-bind="{ ...slotProps }" />
        </template>
    </v-radio-group>
</template>
