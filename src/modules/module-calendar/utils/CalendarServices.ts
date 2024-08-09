/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay.ts';

/** types */
import type { TypeCalendarStore, Dayjs } from '@module-calendar/types';

export function genMatrixCalendar(time: Dayjs, display: TypeCalendarStore['display']) {
    const matrixCalendar: number[][] = Array.from({ length: 7 }, () => []);
    const firstDay = time.set('date', 1);
    const totalDate = time.daysInMonth();
    let day: number = firstDay.day();

    /** fill before matrixCalendar */
    if (display === CalendarDisplay.sunday) {
        for (let i = day - 1; i >= 0; --i) {
            matrixCalendar[i].push(0);
        }
    } else if (display === CalendarDisplay.monday) {
        for (let i = day === 0 ? 6 : day - 1; i >= 1; --i) {
            matrixCalendar[i].push(0);
        }
    } else if (display === CalendarDisplay.weekend) {
        if (day !== 6) {
            for (let i = day - 1; i >= 0; --i) {
                matrixCalendar[i].push(0);
            }
            matrixCalendar[6].push(0);
        }
    }

    /** fill matrixCalendar */
    for (let date = 1; date <= totalDate; ++date) {
        matrixCalendar[day].push(date);
        day = date === totalDate ? day : (day + 1) % 7;
    }

    /** fill after matrixCalendar */
    if (display === CalendarDisplay.sunday) {
        for (let i = day + 1; i <= 6; ++i) {
            matrixCalendar[i].push(0);
        }
    } else if (display === CalendarDisplay.monday) {
        if (day !== 0) {
            for (let i = day + 1; i <= 6; ++i) {
                matrixCalendar[i].push(0);
            }
            matrixCalendar[0].push(0);
        }
    } else if (display === CalendarDisplay.weekend) {
        for (let i = day === 6 ? 0 : day + 1; i <= 5; ++i) {
            matrixCalendar[i].push(0);
        }
    }

    return matrixCalendar;
}

export function genMatrixCalendarDayJS(time: Dayjs, display: TypeCalendarStore['display']) {
    const matrixCalendar: Dayjs[][] = Array.from({ length: 7 }, () => []);
    const firstDay = time.set('date', 1);
    const totalDate = time.daysInMonth();
    let day: number = firstDay.day();

    /** fill before matrixCalendar */
    let prevDay = firstDay.add(-1, 'day');
    if (display === CalendarDisplay.sunday) {
        for (let i = day - 1; i >= 0; --i) {
            matrixCalendar[i].push(prevDay);
            prevDay = prevDay.add(-1, 'day');
        }
    } else if (display === CalendarDisplay.monday) {
        for (let i = day === 0 ? 6 : day - 1; i >= 1; --i) {
            matrixCalendar[i].push(prevDay);
            prevDay = prevDay.add(-1, 'day');
        }
    } else if (display === CalendarDisplay.weekend) {
        if (day !== 6) {
            for (let i = day - 1; i >= 0; --i) {
                matrixCalendar[i].push(prevDay);
                prevDay = prevDay.add(-1, 'day');
            }
            matrixCalendar[6].push(prevDay);
        }
    }

    /** fill matrixCalendar */
    for (let date = 1; date <= totalDate; ++date) {
        matrixCalendar[day].push(time.set('date', date));
        day = date === totalDate ? day : (day + 1) % 7;
    }

    /** fill after matrixCalendar */
    let nextDay = firstDay.add(1, 'month');
    if (display === CalendarDisplay.sunday) {
        for (let i = day + 1; i <= 6; ++i) {
            matrixCalendar[i].push(nextDay);
            nextDay = nextDay.add(1, 'day');
        }
    } else if (display === CalendarDisplay.monday) {
        if (day !== 0) {
            for (let i = day + 1; i <= 6; ++i) {
                matrixCalendar[i].push(nextDay);
                nextDay = nextDay.add(1, 'day');
            }
            matrixCalendar[0].push(nextDay);
        }
    } else if (display === CalendarDisplay.weekend) {
        for (let i = day === 6 ? 0 : day + 1; i <= 5; ++i) {
            matrixCalendar[i].push(nextDay);
            nextDay = nextDay.add(1, 'day');
        }
    }

    return matrixCalendar;
}

export function reverseMatrix<T extends unknown[][]>(matrix: T) {
    const output: any[] = [];
    for (let j = 0; j < matrix[0].length; ++j) {
        output.push([]);
        for (let i = 0; i < matrix.length; ++i) {
            output[j].push(matrix[i][j]);
        }
    }
    return output as T;
}
