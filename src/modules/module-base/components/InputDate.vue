<script setup lang="ts">
/** libs */
import { useI18n } from 'vue-i18n';
import { VTextField } from 'vuetify/components/VTextField';
import { DatePicker } from 'v-calendar';
import { mdiCalendarBlank } from '@mdi/js';
import 'v-calendar/style.css';

defineOptions({ name: 'InputDate', extends: VTextField, inheritAttrs: true });
defineProps<VTextField['$props']>();
defineEmits<{
    (e: 'update:ref', elem: App.ModuleBase.Component.InputElement): void;
    (e: 'update:model-value', value: string): void;
}>();

const { locale } = useI18n();
</script>

<template>
    <DatePicker
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
            <v-text-field
                v-bind.prop="$props"
                autocomplete="off"
                variant="outlined"
                placeholder="dd/mm/yyyy"
                readonly
                :spellcheck="false"
                :model-value="inputValue"
                :append-inner-icon="mdiCalendarBlank"
                v-on="inputEvents"
                @update:ref="$emit('update:ref', $event)"
            />
        </template>
    </DatePicker>
</template>
