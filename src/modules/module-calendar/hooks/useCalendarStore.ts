/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import dayjs from 'dayjs';
import { defineStore } from 'pinia';

/** lang */
import 'dayjs/locale/vi';

/** types */
import type { TypeCalendarStore } from '@module-calendar/models/data';

export const useCalendarStore = defineStore('calendar-store', {
    state: (): TypeCalendarStore => {
        const today = dayjs();
        return {
            today,
            display: 'sun',
            day: today,
            isOnlyMonth: false,
        };
    },
    getters: {
        isToday(state) {
            return (
                state.day.year() === state.today.year() &&
                state.day.month() === state.today.month() &&
                state.day.date() === state.today.date()
            );
        },
    },
    actions: {
        setDay(day: TypeCalendarStore['today']) {
            this.day = day;
        },
        setDisplay(display: TypeCalendarStore['display']) {
            this.display = display;
        },
        isWeekend(day: TypeCalendarStore['today']) {
            const thisDay = day.day();
            return thisDay === 0 || thisDay == 6;
        },
        changeOnlyMonth(value: boolean) {
            this.isOnlyMonth = value;
        },
    },
});
