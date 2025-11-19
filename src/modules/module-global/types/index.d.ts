/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeStore from '@module-base/types/store.d';

declare global {
    namespace App.ModuleGlobal {
        namespace Store {
            type SiderState = TypeStore.TypeSiderState;
            type SiderStore = TypeStore.TypeSiderStore;
        }
    }
}
