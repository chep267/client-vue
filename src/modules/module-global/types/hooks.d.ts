/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export type TypeSiderState = 'collapse' | 'expand' | 'hidden' | 'force';

export type TypeSiderStore = {
    lastState: TypeSiderState;
    siderState: TypeSiderState;
};
