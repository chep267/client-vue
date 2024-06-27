/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay.ts';

/** types */
import { type Dayjs } from 'dayjs';

export type TypeCalendarStore = {
    today: Dayjs;
    display: keyof typeof CalendarDisplay;
    day: Dayjs;
    isOnlyMonth: boolean;
};

export type { Dayjs };
