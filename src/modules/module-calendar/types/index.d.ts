/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from './data.d';

declare global {
    namespace App {
        namespace ModuleCalendar {
            namespace Data {
                type CalendarDisplay = TypeData.TypeCalendarDisplay;
                type CalendarStore = TypeData.TypeCalendarStore;
            }
        }
    }
}
