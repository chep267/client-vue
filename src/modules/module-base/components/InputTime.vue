<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { ref, watch } from 'vue';
import { mdiChevronUp, mdiChevronDown, mdiClockOutline } from '@mdi/js';

/** components */
import InputText from '@module-base/components/InputText.vue';

/** types */
import type { TypeInputElem } from '@module-base/types';

const emits = defineEmits<{
    (e: 'update:ref', elem: TypeInputElem): void;
    (e: 'update:model-value', value: string): void;
}>();

const TimePeriod = {
    AM: 'AM',
    PM: 'PM',
} as const;

const hh = ref<number>(9);
const mm = ref<number>(0);
const period = ref<keyof typeof TimePeriod>(TimePeriod.AM);

const onPrevHour = () => {
    let nextValue = hh.value - 1;
    nextValue = nextValue < 1 ? 12 : nextValue;
    hh.value = nextValue;
    if (nextValue === 12) {
        period.value = TimePeriod.AM;
    }
};
const onNextHour = () => {
    let nextValue = hh.value + 1;
    nextValue = nextValue > 12 ? 1 : nextValue;
    hh.value = nextValue;
    if (nextValue === 12) {
        period.value = TimePeriod.AM;
    }
};
const onPrevMinute = () => {
    const nextValue = mm.value - 1;
    if (nextValue < 0) {
        mm.value = 59;
        onPrevHour();
        return;
    }
    mm.value = nextValue;
};
const onNextMinute = () => {
    const nextValue = mm.value + 1;
    if (nextValue > 59) {
        mm.value = 0;
        onNextHour();
        return;
    }
    mm.value = nextValue;
};

watch(
    () => [hh.value, mm.value, period.value],
    () => {
        if (!hh.value) {
            hh.value = 12;
        }
        if (!mm.value) {
            mm.value = 0;
        }
        const hour = hh.value < 10 ? `0${hh.value}` : hh.value;
        const min = mm.value < 10 ? `0${mm.value}` : mm.value;
        const time = `${hour}:${min} ${period.value}`;
        emits('update:model-value', time);
    }
);
</script>

<template>
    <div class="flex w-full h-full">
        <v-menu>
            <template #activator="{ props }">
                <InputText
                    v-bind.prop="props"
                    v-bind.attr="$attrs"
                    class="input-time"
                    placeholder="--:-- --"
                    autocapitalize="off"
                    autocomplete="off"
                    read-only
                    :append-inner-icon="mdiClockOutline"
                    @update:ref="$emit('update:ref', $event)"
                />
            </template>
            <v-list>
                <v-list-item>
                    <div class="flex card-select flex-col py-2 px-4 items-center gap-2" @click.stop>
                        <div class="flex w-full h-full items-center justify-between">
                            <div class="flex flex-col w-full h-full items-center justify-between">
                                <v-btn :elevation="0" density="comfortable" :icon="mdiChevronUp" @click.stop="onPrevHour" />
                                <v-number-input
                                    v-model="hh"
                                    class="input-number"
                                    variant="outlined"
                                    :max="12"
                                    :min="1"
                                    :step="1"
                                />
                                <v-btn :elevation="0" density="comfortable" :icon="mdiChevronDown" @click.stop="onNextHour" />
                            </div>
                            <span>:</span>
                            <div class="flex flex-col w-full h-full items-center justify-between">
                                <v-btn :elevation="0" density="comfortable" :icon="mdiChevronUp" @click.stop="onPrevMinute" />
                                <v-number-input
                                    v-model="mm"
                                    class="input-number"
                                    variant="outlined"
                                    :max="59"
                                    :min="0"
                                    :step="1"
                                />
                                <v-btn
                                    :elevation="0"
                                    density="comfortable"
                                    :icon="mdiChevronDown"
                                    @click.stop="onNextMinute"
                                />
                            </div>
                        </div>
                        <div class="card-select-period flex justify-between">
                            <v-btn
                                elevation="0"
                                :class="{
                                    'card-select-period-item': true,
                                    'card-select-period-selected': period === TimePeriod.AM,
                                }"
                                @click.stop="period = TimePeriod.AM"
                            >
                                {{ TimePeriod.AM }}
                            </v-btn>
                            <v-btn
                                elevation="0"
                                :class="{
                                    'card-select-period-item': true,
                                    'card-select-period-selected': period === TimePeriod.PM,
                                }"
                                @click.stop="period = TimePeriod.PM"
                            >
                                {{ TimePeriod.PM }}
                            </v-btn>
                        </div>
                    </div>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<style lang="scss" scoped>
:deep(.v-list) {
    background: transparent !important;
    box-shadow: none !important;
    .v-list-item {
        padding: 0;
    }
}
.input-time {
    &:deep(.v-field__append-inner) {
        .v-icon {
            font-size: 20.5px;
        }
    }
    &:deep(.v-field) {
        padding-inline-end: 16px;
    }
}
.card-select {
    width: 160px;
    height: 160px;
    border: 1px solid rgba(var(--v-bs-border-color), 1);
    border-radius: 10px;
    background-color: white;
    &-period {
        width: 125px;
        height: 24px;
        &-item {
            &:first-of-type {
                border-radius: 6px 0 0 6px;
                border-right: none !important;
            }
            &:last-of-type {
                border-radius: 0 6px 6px 0;
            }
            padding: 0;
            min-width: 0;
            width: 50%;
            height: 24px;
            border: 1px solid rgba(var(--v-bs-border-color), 1);
            font-size: 14px;
            font-family: Quicksand, sans-serif;
            font-weight: 600;
        }
        &-selected {
            background-color: rgba(var(--v-theme-main), 0.15);
        }
    }
}
.input-number {
    line-height: 0;
    grid-template-areas: unset !important;
    grid-template-rows: 0 !important;
    max-height: 26px;
    &:deep(.v-number-input__control) {
        display: none;
    }
    &:deep(.v-input__details) {
        display: none;
    }
    &:deep(.v-field__outline) {
        .v-field__outline__start,
        .v-field__outline__end {
            color: transparent;
        }
    }
    &:deep(.v-field__input) {
        padding: 0;
        min-height: 0;
        text-align: center;
        width: 36px;
    }
}
</style>
