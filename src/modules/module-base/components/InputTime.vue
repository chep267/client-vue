<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { reactive, watch } from 'vue';
import clsx from 'clsx';
import { VTextField } from 'vuetify/components/VTextField';
import { mdiChevronUp, mdiChevronDown, mdiClockOutline } from '@mdi/js';

defineOptions({ name: 'InputTime', extends: VTextField, inheritAttrs: true });
defineProps<VTextField['$props']>();
const emits = defineEmits<{
    (e: 'update:ref', elem: App.ModuleBase.Component.InputElement): void;
    (e: 'update:model-value', value: string): void;
}>();

const TimePeriod = {
    AM: 'AM',
    PM: 'PM',
} as const;

const data = reactive<{
    hour: number;
    min: number;
    period: keyof typeof TimePeriod;
}>({
    hour: 9,
    min: 0,
    period: TimePeriod.AM,
});

const onPrevHour = () => {
    let nextValue = data.hour - 1;
    nextValue = nextValue < 1 ? 12 : nextValue;
    data.hour = nextValue;
    if (nextValue === 12) {
        data.period = TimePeriod.AM;
    }
};
const onNextHour = () => {
    let nextValue = data.hour + 1;
    nextValue = nextValue > 12 ? 1 : nextValue;
    data.hour = nextValue;
    if (nextValue === 12) {
        data.period = TimePeriod.AM;
    }
};
const onPrevMinute = () => {
    const nextValue = data.min - 1;
    if (nextValue < 0) {
        data.min = 59;
        return onPrevHour();
    }
    data.min = nextValue;
};
const onNextMinute = () => {
    const nextValue = data.min + 1;
    if (nextValue > 59) {
        data.min = 0;
        return onNextHour();
    }
    data.min = nextValue;
};

watch(data, () => {
    if (!data.hour) {
        data.hour = 12;
        return;
    }
    if (!data.min) {
        data.min = 0;
        return;
    }
    const hour = data.hour < 10 ? `0${data.hour}` : data.hour;
    const min = data.min < 10 ? `0${data.min}` : data.min;
    const time = `${hour}:${min} ${data.period}`;
    emits('update:model-value', time);
});
</script>

<template>
    <v-menu>
        <template #activator="{ props: menuProps }">
            <v-text-field
                v-bind.prop="{ ...$props, ...menuProps }"
                v-bind.attr="$attrs"
                placeholder="--:-- --"
                autocapitalize="off"
                autocomplete="off"
                read-only
                :spellcheck="false"
                variant="outlined"
                :append-inner-icon="mdiClockOutline"
                @update:ref="$emit('update:ref', $event)"
            />
        </template>
        <v-list class="max-w-40 shadow-none">
            <v-list-item>
                <div
                    class="flex h-max w-full flex-col items-center gap-2 rounded-lg border border-solid px-4 py-2"
                    @click.stop
                >
                    <div class="flex h-full w-full items-center justify-between">
                        <div class="flex h-full w-full flex-col items-center justify-between gap-2">
                            <v-btn
                                aria-label="button prev hour shadow-none"
                                density="comfortable"
                                :icon="mdiChevronUp"
                                @click.stop="onPrevHour"
                            />
                            <v-number-input
                                v-model="data.hour"
                                class="input-number"
                                variant="outlined"
                                :max="12"
                                :min="1"
                                :step="1"
                            />
                            <v-btn
                                aria-label="button next hour shadow-none"
                                density="comfortable"
                                :icon="mdiChevronDown"
                                @click.stop="onNextHour"
                            />
                        </div>
                        <span>:</span>
                        <div class="flex h-full w-full flex-col items-center justify-between gap-2">
                            <v-btn
                                aria-label="button prev minute shadow-none"
                                density="comfortable"
                                :icon="mdiChevronUp"
                                @click.stop="onPrevMinute"
                            />
                            <v-number-input
                                v-model="data.min"
                                class="input-number"
                                variant="outlined"
                                :max="59"
                                :min="0"
                                :step="1"
                            />
                            <v-btn
                                aria-label="button next minute shadow-none"
                                density="comfortable"
                                :icon="mdiChevronDown"
                                @click.stop="onNextMinute"
                            />
                        </div>
                    </div>
                    <div class="flex w-28 justify-between overflow-hidden rounded-md border border-solid">
                        <v-btn
                            :class="
                                clsx('h-6 min-h-0 w-1/2 min-w-0 rounded-none p-0 shadow-none', {
                                    'bg-info': data.period === TimePeriod.AM,
                                })
                            "
                            @click.stop="data.period = TimePeriod.AM"
                        >
                            {{ TimePeriod.AM }}
                        </v-btn>
                        <v-btn
                            :class="
                                clsx('h-6 min-h-0 w-1/2 min-w-0 rounded-none p-0 shadow-none', {
                                    'bg-info': data.period === TimePeriod.PM,
                                })
                            "
                            @click.stop="data.period = TimePeriod.PM"
                        >
                            {{ TimePeriod.PM }}
                        </v-btn>
                    </div>
                </div>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<style lang="scss" scoped>
:deep(.v-list) {
    padding: 0;
    .v-list-item {
        padding: 0;
    }
}

.input-number {
    &:deep(.v-number-input__control) {
        display: none;
    }
    &:deep(.v-input__details) {
        display: none;
    }
    &:deep(.v-field__append-inner) {
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
        width: 24px;
    }
}
</style>
