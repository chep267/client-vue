/** utils */
import { delay } from '@module-base/utils/delay';

/** types */
import type { TypeInputElem } from '@module-base/types';

export const focusInput = (payload: { timer?: number; elem?: TypeInputElem; cb?(): void }) => {
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
