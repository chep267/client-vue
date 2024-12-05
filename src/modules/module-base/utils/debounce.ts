/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

export const debounce = (timer: number = AppTimer.debounce, cb?: () => void) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(cb?.()), timer);
    });
};
