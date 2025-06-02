/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { delay } from '@module-base/utils/delay';

export const focusInput = (payload: { timer?: number; elem?: App.ModuleBase.Component.InputElement; cb?(): void }) => {
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
