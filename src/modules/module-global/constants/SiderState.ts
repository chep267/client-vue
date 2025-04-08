/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type { TypeSiderState } from '@module-global/types';

export const SiderState: Readonly<{ [Key in TypeSiderState]: Key }> = {
    collapse: 'collapse',
    expand: 'expand',
    hidden: 'hidden',
    force: 'force',
};
