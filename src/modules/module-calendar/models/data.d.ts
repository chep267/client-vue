/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import { type Dayjs } from 'dayjs';

export type TypeCalendarStore = {
    today: Dayjs;
    display: 'sun' | 'mon' | 'week';
    day: Dayjs;
    isOnlyMonth: boolean;
};
