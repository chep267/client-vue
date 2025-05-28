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

export const useCalendarStore = defineStore('calendar-store', {
    state: (): App.ModuleCalendar.Data.CalendarStore => {
        const today = dayjs();
        return {
            today,
            display: CalendarDisplay.sunday,
            day: today,
            isOnlyMonth: false,
        };
    },
    actions: {
        setDay(day: App.ModuleCalendar.Data.CalendarStore['today']) {
            this.day = day;
        },
        setDisplay(display: App.ModuleCalendar.Data.CalendarStore['display']) {
            this.display = display;
        },
        setOnlyMonth(value: boolean) {
            this.isOnlyMonth = value;
        },
        isWeekend(day: App.ModuleCalendar.Data.CalendarStore['today'] | number) {
            const thisDay = typeof day === 'number' ? day : day.day();
            return thisDay === 0 || thisDay == 6;
        },
        isInMonth(day: App.ModuleCalendar.Data.CalendarStore['today']) {
            return this.day.year() === day.year() && this.day.month() === day.month();
        },
        isToday(day: App.ModuleCalendar.Data.CalendarStore['today']) {
            return this.today.year() === day.year() && this.today.month() === day.month() && this.today.date() === day.date();
        },
    },
});
