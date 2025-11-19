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
        namespace Api {
            type Signin = TypeApi.TypeApiAuth['Signin'];
            type Signout = TypeApi.TypeApiAuth['Signout'];
            type Register = TypeApi.TypeApiAuth['Register'];
            type Recover = TypeApi.TypeApiAuth['Recover'];
            type Restart = TypeApi.TypeApiAuth['Restart'];
        }
        namespace Store {
            type AuthStore = TypeStore.TypeAuthStore;
        }
    }
}
