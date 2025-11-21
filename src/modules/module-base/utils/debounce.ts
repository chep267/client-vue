/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

export const debounce = (timer: number = AppTimer.debounce, cb?: (...args: any[]) => void) => {
    // closure function
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        if (timeout) {
            clearTimeout(timeout); // clear previous timeout
        }
        timeout = setTimeout(() => cb?.(...args), timer); // set a new timeout
    };
};
