/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type { UserInfo } from 'firebase/compat';

export type TypeAuthStore = {
    prePath: string;
    user: null | UserInfo;
};
