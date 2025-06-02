/**
 *
 * @author dongntd267@gmail.com
 *
 */

export type TypeSiderState = 'collapse' | 'expand' | 'hidden' | 'force';

export type TypeSiderStore = {
    lastState: TypeSiderState;
    siderState: TypeSiderState;
};
