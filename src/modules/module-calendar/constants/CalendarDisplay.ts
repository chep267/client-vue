/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type { TypeCalendarDisplay } from '@module-calendar/types';

export const CalendarDisplay: Readonly<{ [Key in TypeCalendarDisplay]: Key }> = {
    sunday: 'sunday',
    monday: 'monday',
    weekend: 'weekend',
};
