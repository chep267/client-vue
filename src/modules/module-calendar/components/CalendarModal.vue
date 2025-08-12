<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

/** constants */
import { LocaleObject } from '@module-base/constants/LocaleObject';
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

/** utils */
import VietnameseDate from '@module-calendar/utils/Lunar';

/** hooks */
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore';

/** types */
import type { Dayjs } from 'dayjs';

const props = defineProps<{
    day: Dayjs | null;
}>();

defineEmits<{
    (e: 'on-close'): void;
}>();

const { t, locale } = useI18n();
const calendarStore = useCalendarStore();

const isOpen = ref(!!props.day);

const lunarDay = computed(() => {
    if (!props.day) {
        return null;
    }
    return new VietnameseDate(new Date(`${props.day.year()}-${props.day.month() + 1}-${props.day.date()}`));
});

const titleCalendar = computed(() => {
    if (!props.day) {
        return '';
    }
    const month = props.day.format(locale.value === LocaleObject.en ? 'MMMM' : 'MM');
    const year = props.day.format('YYYY');
    return t(CalendarLanguage.component.label.calendarInfo.title, { month, year });
});

const isToday = computed(() => (!props.day ? false : calendarStore.isToday(props.day)));
const isWeekend = computed(() => (!props.day ? false : calendarStore.isWeekend(props.day)));

watch(
    () => props.day,
    () => {
        isOpen.value = !!props.day;
    }
);
</script>

<template>
    <v-overlay v-model="isOpen" class="flex items-center justify-center" @update:model-value="$emit('on-close')">
        <v-card
            :class="{
                'flex flex-col overflow-auto': true,
                'max-sm:w-[calc(100vw-32px)]': true, // mobile
                'sm:w-[600px]': true, // tablet
                'lg:w-[750px]': true, // pc
            }"
            height="70vh"
        >
            <div class="flex h-full flex-col justify-between">
                <div v-if="day" class="flex min-h-96 flex-1 flex-col items-center justify-between">
                    <div class="flex w-full justify-end p-5">
                        <span
                            :class="{
                                'text-2xl italic': true,
                                'calendar-item-today': isToday,
                                'text-red': isWeekend,
                            }"
                        >
                            {{ titleCalendar }}
                        </span>
                    </div>
                    <div class="flex flex-1 flex-col items-center justify-center">
                        <span
                            :class="{
                                'text-9xl': true,
                                'calendar-item-today': isToday,
                                'text-red': isWeekend,
                            }"
                        >
                            {{ day.date() }}
                        </span>
                    </div>
                    <div class="flex h-32 flex-col items-center justify-center">
                        <span
                            :class="{
                                'text-3xl capitalize': true,
                                'calendar-item-today': isToday,
                                'text-red': isWeekend,
                            }"
                        >
                            {{ day.locale(locale).format('dddd') }}
                        </span>
                    </div>
                </div>
                <div v-if="lunarDay" class="lunar flex h-40 min-h-40 truncate">
                    <div class="flex flex-1 flex-col items-center justify-between p-2">
                        <span class="text-xl">{{ $t(CalendarLanguage.component.label.day) }}</span>
                        <span class="text-3xl">{{ lunarDay.day }}</span>
                        <span class="text-xl">{{
                            `${lunarDay.celestialStemOfDay} ${lunarDay.terrestrialBranchOfDay}`
                        }}</span>
                    </div>
                    <div class="flex flex-1 flex-col items-center justify-between p-2">
                        <span class="text-xl">{{ $t(CalendarLanguage.component.label.month) }}</span>
                        <span class="text-3xl">{{ lunarDay.month }}</span>
                        <span class="text-xl">{{
                            `${lunarDay.celestialStemOfMonth} ${lunarDay.terrestrialBranchOfMonth}`
                        }}</span>
                    </div>
                    <div class="flex flex-1 flex-col items-center justify-between p-2">
                        <span class="text-xl">{{ $t(CalendarLanguage.component.label.year) }}</span>
                        <span class="text-3xl">{{ lunarDay.year }}</span>
                        <span class="text-xl">{{
                            `${lunarDay.celestialStemOfYear} ${lunarDay.terrestrialBranchOfYear}`
                        }}</span>
                    </div>
                </div>
            </div>
        </v-card>
    </v-overlay>
</template>

<style scoped lang="scss">
.lunar {
    border-top: 1px solid rgba(var(--v-theme-on-surface), 0.3);
    & > div:nth-child(2) {
        border-left: 1px solid rgba(var(--v-theme-on-surface), 0.3);
        border-right: 1px solid rgba(var(--v-theme-on-surface), 0.3);
    }
}
:deep(.calendar-item-today) {
    color: rgba(var(--v-theme-info));
}
</style>
