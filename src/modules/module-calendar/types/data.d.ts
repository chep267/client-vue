/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import { type Dayjs } from 'dayjs';

export declare type TypeCalendarDisplay = 'sunday' | 'monday' | 'weekend';

export declare type TypeCalendarStore = {
    today: Dayjs;
    display: TypeCalendarDisplay;
    day: Dayjs;
    isOnlyMonth: boolean;
};

export type { Dayjs };
