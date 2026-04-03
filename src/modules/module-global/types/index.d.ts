/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeStore from '@module-global/types/store.d';

declare global {
    namespace App.ModuleGlobal {
        export import Store = TypeStore;
    }
}
