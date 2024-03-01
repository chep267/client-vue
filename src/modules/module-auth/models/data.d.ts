/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import type { UserInfo } from 'firebase/compat';

export type TypeAuthStore = {
    state: 'start' | 'signed' | 'signin';
    prePath: string;
    user: null | UserInfo;
};
