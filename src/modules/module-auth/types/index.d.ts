/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type * as TypeApis from './api.d';
import type * as TypeHooks from './hook.d';

declare global {
    namespace App {
        namespace ModuleAuth {
            namespace Apis {
                type Signin = TypeApis.TypeApiAuth['Signin'];
                type SignOut = TypeApis.TypeApiAuth['SignOut'];
                type Register = TypeApis.TypeApiAuth['Register'];
                type Recover = TypeApis.TypeApiAuth['Recover'];
                type Restart = TypeApis.TypeApiAuth['Restart'];
            }
            namespace Hooks {
                type AuthStore = TypeHooks.TypeAuthStore;
            }
        }
    }
}
