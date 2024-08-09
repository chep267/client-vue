/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage.ts';

export const en = {
    [CalendarLanguage.component.label.router]: 'Calendar',
    [CalendarLanguage.component.label.today]: 'Today',
    [CalendarLanguage.component.label.solar]: 'Solar calendar',
    [CalendarLanguage.component.label.lunar]: 'Lunar calendar',
    [CalendarLanguage.component.label.day]: 'Day',
    [CalendarLanguage.component.label.month]: 'Month',
    [CalendarLanguage.component.label.year]: 'Year',
    [CalendarLanguage.component.label.calendarInfo.title]: '{month}, {year}',
    [CalendarLanguage.component.label.calendarInfo.solar]: 'Solar calendar, ngày {day} tháng {month} năm {year}',
    [CalendarLanguage.component.label.calendarInfo.lunar]: 'Lunar calendar, ngày {day} tháng {month} năm {year}',
    [CalendarLanguage.component.label.display.title]: 'Calendar display',
    [CalendarLanguage.component.label.display.default]: 'Default',
    [CalendarLanguage.component.label.display.monday]: 'Monday',
    [CalendarLanguage.component.label.display.weekend]: 'Weekend',
    [CalendarLanguage.component.label.display.onlyMonth]: 'Only month',
    [CalendarLanguage.component.label.display.bothMonth]: 'Both months',
} as const;
