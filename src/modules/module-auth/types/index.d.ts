/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeApi from '@module-auth/types/api.d';
import type * as TypeStore from '@module-auth/types/store.d';

declare global {
    namespace App.ModuleAuth {
        export import Api = TypeApi;
        export import Store = TypeStore;
    }
}
