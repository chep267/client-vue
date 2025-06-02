/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { Dayjs } from 'dayjs';

export type TypeCalendarDisplay = 'sunday' | 'monday' | 'weekend';

export type TypeCalendarStore = {
    today: Dayjs;
    display: TypeCalendarDisplay;
    day: Dayjs;
    isOnlyMonth: boolean;
};
