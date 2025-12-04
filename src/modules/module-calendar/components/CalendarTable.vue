<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay';

/** utils */
import { genMatrixCalendarDayJS, reverseMatrix } from '@module-calendar/utils/calendarServices';

/** hooks */
import { useSiderStore } from '@module-base/stores/useSiderStore';
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore';

/** types */
import type { VDataTableVirtual } from 'vuetify/components/VDataTable';
import type { Dayjs } from 'dayjs';

const emits = defineEmits<{
    (e: 'on-select-day', day: Dayjs): void;
}>();

const { locale } = useI18n();
const siderStore = useSiderStore();
const calendarStore = useCalendarStore();

const { siderState } = storeToRefs(siderStore);
const { display, day, isOnlyMonth } = storeToRefs(calendarStore);

const tableHeight = computed(() => {
    const headerHeight = AppScreenSize.HeaderHeight;
    const appBarMiniHeight = siderState.value === AppSiderState.hidden ? AppScreenSize.AppBarMiniHeight : 0;
    const calendarSelectHeight = AppScreenSize.CalendarSelectHeight;
    const paddingHeight = 32;
    const borderHeight = 2;
    return `calc(100vh - ${headerHeight + appBarMiniHeight + calendarSelectHeight + paddingHeight + borderHeight}px)`;
});

const data = computed(() => {
    const matrixCalendar = genMatrixCalendarDayJS(day.value, display.value);
    const output = reverseMatrix(matrixCalendar);
    return output.map((item) => item);
});

const headers = computed<VDataTableVirtual['$props']['headers']>(() => {
    let output: number[];
    switch (display.value) {
        case CalendarDisplay.weekend:
            output = [6, 0, 1, 2, 3, 4, 5];
            break;
        case CalendarDisplay.monday:
            output = [1, 2, 3, 4, 5, 6, 0];
            break;
        case CalendarDisplay.sunday:
        default:
            output = [0, 1, 2, 3, 4, 5, 6];
            break;
    }
    return output.map((day) => {
        const isWeekend = calendarStore.isWeekend(day);
        return {
            key: `${day}`,
            title: dayjs().day(day).locale(locale.value).format('ddd'),
            align: 'center',
            sortable: false,
            value: (item) => (item[day] as Dayjs).date(),
            headerProps: {
                class: { 'text-red': isWeekend },
            },
            cellProps: (data) => {
                const thisDay = data.item[day] as Dayjs;
                const isToDay = calendarStore.isToday(thisDay);
                const isInMonth = calendarStore.isInMonth(thisDay);
                const hideDiffMonth = isOnlyMonth.value && !isInMonth;
                return {
                    class: {
                        'calendar-item': true,
                        'calendar-item-today': isToDay,
                        'calendar-item-diff-month': !isInMonth,
                        'text-red': isInMonth && isWeekend,
                        invisible: hideDiffMonth,
                    },
                    onclick: () => emits('on-select-day', thisDay),
                };
            },
        };
    });
});
</script>

<template>
    <v-data-table-virtual
        class="scrollbar-custom rounded-none"
        fixed-header
        :headers="headers"
        :items="data"
        :height="tableHeight"
    />
</template>

<style scoped lang="scss">
:deep(.calendar-item) {
    position: relative;
    height: 70px !important;
    font-size: 1rem;
    &:before {
        position: absolute;
        content: '';
        top: calc(50% - 20px);
        left: calc(50% - 20px);
        border-radius: 9999px;
        width: 40px;
        height: 40px;
        background-color: transparent;
        z-index: 0;
        cursor: pointer;
    }
    &:hover {
        font-weight: bold;
        &:before {
            background-color: rgba(var(--v-theme-on-surface), 0.1);
        }
    }
}

:deep(.calendar-item-today) {
    color: rgba(var(--v-theme-info));
    &:before {
        border: 1px solid rgba(var(--v-theme-info));
    }
}

:deep(.calendar-item-diff-month) {
    color: rgba(var(--v-theme-on-surface), 0.3) !important;
}
</style>
