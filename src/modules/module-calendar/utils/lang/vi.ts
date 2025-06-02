/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

export const vi = {
    [CalendarLanguage.component.label.router]: 'Lịch',
    [CalendarLanguage.component.label.today]: 'Hôm nay',
    [CalendarLanguage.component.label.solar]: 'Dương lịch',
    [CalendarLanguage.component.label.lunar]: 'Âm lịch',
    [CalendarLanguage.component.label.day]: 'Ngày',
    [CalendarLanguage.component.label.month]: 'Tháng',
    [CalendarLanguage.component.label.year]: 'Năm',
    [CalendarLanguage.component.label.calendarInfo.title]: 'Tháng {month} năm {year}',
    [CalendarLanguage.component.label.calendarInfo.solar]: 'Dương lịch, ngày {day} tháng {month} năm {year}',
    [CalendarLanguage.component.label.calendarInfo.lunar]: 'Âm lịch, ngày {day} tháng {month} năm {year}',
    [CalendarLanguage.component.label.display.title]: 'Hiển thị lịch',
    [CalendarLanguage.component.label.display.default]: 'Mặc định',
    [CalendarLanguage.component.label.display.monday]: 'Đầu tuần',
    [CalendarLanguage.component.label.display.weekend]: 'Cuối tuần',
    [CalendarLanguage.component.label.display.onlyMonth]: 'Trong tháng',
    [CalendarLanguage.component.label.display.bothMonth]: 'Ngoài tháng',
} as const;
