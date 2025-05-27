/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** utils */
import { delay } from '@module-base/utils/delay';

export const focusInput = (payload: { timer?: number; elem?: App.ModuleBase.Components.InputElement; cb?(): void }) => {
    const { elem, cb, timer = 1 } = payload;
    if (!elem) {
        return cb?.();
    }
    return delay(timer, () => {
        elem.selectionStart = elem.selectionEnd = elem.value?.length || 0;
        elem.focus?.();
        cb?.();
    });
};
