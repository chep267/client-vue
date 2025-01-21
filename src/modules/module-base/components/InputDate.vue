<script setup lang="ts">
/** libs */
import { useI18n } from 'vue-i18n';
import { mdiCalendarBlank } from '@mdi/js';

/** components */
import InputText from '@module-base/components/InputText.vue';

/** types */
import type { InputTextProps, TypeInputElem } from '@module-base/types';

defineOptions({ name: 'InputDate', extends: InputText, inheritAttrs: true });
defineProps<InputTextProps>();
defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
    (e: 'update:model-value', value: string): void;
}>();

const { locale } = useI18n();
</script>

<template>
    <vc-date-picker
        v-bind.attr="$attrs"
        :masks="{ input: 'DD/MM/YYYY' }"
        :popover="{
            visibility: 'click',
        }"
        :locale="locale"
        :first-day-of-week="2"
        @update:model-value="$emit('update:model-value', $event)"
    >
        <template #default="{ inputValue, inputEvents }">
            <InputText
                v-bind.prop="$props"
                :model-value="inputValue"
                :append-inner-icon="mdiCalendarBlank"
                placeholder="dd/mm/yyyy"
                readonly
                v-on="inputEvents"
                @update:ref="$emit('update:ref', $event)"
            />
        </template>
    </vc-date-picker>
</template>

<style lang="scss" scoped>
:deep(.v-field__append-inner) {
    color: rgb(var(--v-bs-body-color));
}
</style>
