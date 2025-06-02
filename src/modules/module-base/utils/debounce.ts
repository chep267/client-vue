/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

export const debounce = (timer: number = AppTimer.debounce, cb?: (...args: any[]) => void) => {
    // closure function
    let timeout: number;
    return (...args: any[]) => {
        if (timeout) {
            clearTimeout(timeout); // Hủy lần timeout trước đó
        }
        timeout = setTimeout(() => cb?.(...args), timer); // Thiết lập timeout mới
    };
};
