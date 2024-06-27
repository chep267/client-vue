<script setup lang="ts">
/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLocale, useTheme } from 'vuetify';
import { VDataTableVirtual } from 'vuetify/components';
import dayjs, { type Dayjs } from 'dayjs';

/** constants */
import { themeObject } from '@module-theme/constants/themeObject.ts';
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** hooks */
import { SiderState, useSiderStore } from '@module-base/hooks/useSiderStore.ts';
import { useCalendarStore } from '@module-calendar/hooks/useCalendarStore.ts';
import { genMatrixCalendarDayJS, reverseMatrix } from '@module-calendar/utils/CalendarServices.ts';

const theme = useTheme();
const locale = useLocale();
const siderStore = useSiderStore();
const calendarStore = useCalendarStore();

const { siderState } = storeToRefs(siderStore);
const { display, day } = storeToRefs(calendarStore);

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
        const isWeekend = day === 0 || day === 6;
        return {
            key: `${day}`,
            title: dayjs().day(day).locale(locale.current.value).format('ddd'),
            align: 'center',
            sortable: false,
            value: (item) => (item[day] as Dayjs).date(),
            headerProps: {
                class: isWeekend ? 'text-red' : '',
            },
            cellProps: {
                class: isWeekend ? 'text-red' : '',
            },
        };
    });
});
</script>

<template>
    <v-data-table-virtual
        :class="{ 'rounded-0 table-scroll': true, 'table-scroll-dark': theme.global.name.value === themeObject.dark }"
        fixed-header
        :headers="headers"
        :items="data"
        :hover="true"
        :item-height="100"
        :height="tableHeight" />
</template>

<style scoped lang="scss">
.table {
    &:deep(.v-table__wrapper) {
        &::-webkit-scrollbar {
            width: 15px;
        }
        &::-webkit-scrollbar-track {
            //background-color: transparent;
            //border-radius: 10px;

            background: #202020;
            border-left: 1px solid #2c2c2c;
        }
        &::-webkit-scrollbar-thumb {
            background: #3e3e3e;
            border: solid 3px #202020;
            border-radius: 7px;

            //background-color: transparent;
            //border-radius: 10px;
        }
        &:hover {
            &::-webkit-scrollbar-track {
                background-color: gray;
            }
            &::-webkit-scrollbar-thumb {
                //background-color: var(--v-theme-info);
                background: white;
            }
        }
    }
}

.table-scroll {
    &:deep(.v-table__wrapper) {
        &::-webkit-scrollbar {
            width: 12px;
        }
        &::-webkit-scrollbar-track {
            background: #e6e6e6;
        }
        &::-webkit-scrollbar-thumb {
            min-height: 50px;
            background: #b0b0b0;
            border: solid 2px #e6e6e6;
            border-radius: 7px;
        }
        &:hover {
            &::-webkit-scrollbar-thumb {
                background: var(--v-theme-grey-darken-2, #616161);
            }
        }
    }
}

.table-scroll-dark {
    &:deep(.v-table__wrapper) {
        &::-webkit-scrollbar {
            width: 15px;
        }
        &::-webkit-scrollbar-track {
            background: #202020;
            border-left: 1px solid #2c2c2c;
        }
        &::-webkit-scrollbar-thumb {
            background: #3e3e3e;
            border: solid 3px #202020;
            border-radius: 7px;
        }
        &:hover {
            &::-webkit-scrollbar-thumb {
                background: grey;
            }
        }
    }
}
</style>
