/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export const CalendarLanguage = {
    component: {
        label: {
            router: 'module.calendar.component.label.router',
            today: 'module.calendar.component.label.today',
            solar: 'module.calendar.component.label.solar',
            lunar: 'module.calendar.component.label.lunar',
            day: 'module.calendar.component.label.day',
            month: 'module.calendar.component.label.month',
            year: 'module.calendar.component.label.year',
            display: {
                title: 'module.calendar.component.label.display.title',
                monday: 'module.calendar.component.label.display.monday',
                weekend: 'module.calendar.component.label.display.weekend',
                default: 'module.calendar.component.label.display.default',
                onlyMonth: 'module.calendar.component.label.display.onlyMonth',
                bothMonth: 'module.calendar.component.label.display.bothMonth',
            },
            calendarInfo: {
                title: 'module.calendar.component.label.calendarInfo.title',
                solar: 'module.calendar.component.label.calendarInfo.solar',
                lunar: 'module.calendar.component.label.calendarInfo.lunar',
            },
        },
    },

    // 'module.calendar.component.calendar.title.text': '{month}, {year}',
    // 'module.calendar.component.calendarInfo.title.solar.text': 'Solar calendar, ngày {day} tháng {month} năm {year}',
    // 'module.calendar.component.calendarInfo.title.lunar.text': 'Lunar calendar, ngày {day} tháng {month} năm {year}',
} as const;
