/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TypeSiderState } from '@module-global/types';

export const SiderState = Object.freeze<Record<TypeSiderState, TypeSiderState>>({
    collapse: 'collapse',
    expand: 'expand',
    hidden: 'hidden',
    force: 'force',
});
