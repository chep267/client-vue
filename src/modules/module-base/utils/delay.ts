/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

export const delay = (timer: number = AppTimer.delay, cb?: () => void): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(cb?.()), timer);
    });
};
