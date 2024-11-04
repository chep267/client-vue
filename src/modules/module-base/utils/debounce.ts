/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

export const debounce = (timer = 1000, callback?: () => void) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(callback?.()), timer);
    });
};
