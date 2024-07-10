<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLocale } from 'vuetify';
import { VDataTableVirtual } from 'vuetify/components';
import dayjs from 'dayjs';

/** constants */
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';
import { SiderState } from '@module-global/constants/SiderState.ts';

/** utils */
import { genMatrixCalendarDayJS, reverseMatrix } from '@module-calendar/utils/CalendarServices.ts';

/** hooks */
import { useSiderStore } from '@module-global/hooks/useSiderStore.ts';
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore.ts';

/** types */
import type { Dayjs } from '@module-calendar/types';

const emits = defineEmits<{
    (e: 'onSelectDay', day: Dayjs): void;
}>();

const locale = useLocale();
const siderStore = useSiderStore();
const calendarStore = useCalendarStore();

const { siderState } = storeToRefs(siderStore);
const { display, day, isOnlyMonth } = storeToRefs(calendarStore);

const tableHeight = computed(() => {
    const headerHeight = ScreenSize.HeaderHeight;
    const appBarMiniHeight = siderState.value === SiderState.hidden ? ScreenSize.AppBarMiniHeight : 0;
    const calendarTitleHeight = ScreenSize.CalendarTitleHeight;
    const paddingHeight = 2 * 16;
    const borderHeight = 2;
    return `calc(100vh - ${headerHeight + appBarMiniHeight + calendarTitleHeight + paddingHeight + borderHeight}px)`;
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
            title: dayjs().day(day).locale(locale.current.value).format('ddd'),
            align: 'center',
            sortable: false,
            value: (item) => (item[day] as Dayjs).date(),
            headerProps: {
                class: { 'text-red': isWeekend },
            },
            cellProps: (data) => {
                const thisDay = data.item[day] as Dayjs;
                const isToDay = calendarStore.isToday(thisDay);
                const isToMonth = calendarStore.isToMonth(thisDay);
                const hideDiffMonth = isOnlyMonth.value && !isToMonth;
                return {
                    class: {
                        'calendar-item': true,
                        'calendar-item-today': isToDay,
                        'text-red': isWeekend,
                        'calendar-item-diff-month': !isToDay && !isToMonth,
                        invisible: hideDiffMonth,
                    },
                    onclick: () => emits('onSelectDay', thisDay),
                };
            },
        };
    });
});
</script>

<template>
    <v-data-table-virtual
        class="rounded-0 table-scroll"
        fixed-header
        :headers="headers"
        :items="data"
        :height="tableHeight" />
</template>

<style scoped lang="scss">
.table-scroll:deep(.v-table__wrapper) {
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    &::-webkit-scrollbar-track {
        background: rgba(var(--v-border-color), var(--v-border-opacity));
    }
    &::-webkit-scrollbar-thumb {
        min-height: 50px;
        background: rgba(var(--v-border-color), 0.1);
        border-radius: 7px;
    }
    &:hover::-webkit-scrollbar-thumb {
        background: rgba(var(--v-border-color), 0.3);
    }
}

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
