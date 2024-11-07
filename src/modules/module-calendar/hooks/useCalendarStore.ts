/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import dayjs from 'dayjs';
import { defineStore } from 'pinia';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';

/** constants */
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay';

/** types */
import type { TypeCalendarStore } from '@module-calendar/types';

export const useCalendarStore = defineStore('calendar-store', {
    state: (): TypeCalendarStore => {
        const today = dayjs();
        return {
            today,
            display: CalendarDisplay.sunday,
            day: today,
            isOnlyMonth: false,
        };
    },
    actions: {
        setDay(day: TypeCalendarStore['today']) {
            this.day = day;
        },
        setDisplay(display: TypeCalendarStore['display']) {
            this.display = display;
        },
        setOnlyMonth(value: boolean) {
            this.isOnlyMonth = value;
        },
        isWeekend(day: TypeCalendarStore['today'] | number) {
            const thisDay = typeof day === 'number' ? day : day.day();
            return thisDay === 0 || thisDay == 6;
        },
        isInMonth(day: TypeCalendarStore['today']) {
            return this.day.year() === day.year() && this.day.month() === day.month();
        },
        isToday(day: TypeCalendarStore['today']) {
            return this.today.year() === day.year() && this.today.month() === day.month() && this.today.date() === day.date();
        },
    },
});
