/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export const focusInput = (payload: { elem?: HTMLInputElement | null; fnCallback?(): void }) => {
    const { elem, fnCallback } = payload;
    if (!elem) {
        fnCallback?.();
        return false;
    }
    setTimeout(() => {
        elem.selectionStart = elem.selectionEnd = elem.value.length;
        elem.focus?.();
        fnCallback?.();
    }, 1);
};
