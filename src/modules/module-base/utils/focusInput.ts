/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** utils */
import { debounce } from '@module-base/utils/debounce';

/** types */
import type { TypeInputElem } from '@module-base/types';

export const focusInput = (payload: { elem?: TypeInputElem; fnCallback?(): void }) => {
    const { elem, fnCallback } = payload;
    if (!elem) {
        fnCallback?.();
        return false;
    }
    return debounce(1, () => {
        elem.selectionStart = elem.selectionEnd = elem.value?.length || 0;
        elem.focus?.();
        fnCallback?.();
    });
};
