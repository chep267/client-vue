/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type { TypeTheme } from '@module-theme/types';

export const themeObject: Readonly<{ [Key in TypeTheme]: Key }> = {
    dark: 'dark',
    light: 'light',
};
