/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type * as TypeApi from './api.d';
import type * as TypeHook from './hook.d';

declare global {
    namespace App {
        namespace ModuleAuth {
            namespace Api {
                type Signin = TypeApi.TypeApiAuth['Signin'];
                type SignOut = TypeApi.TypeApiAuth['SignOut'];
                type Register = TypeApi.TypeApiAuth['Register'];
                type Recover = TypeApi.TypeApiAuth['Recover'];
                type Restart = TypeApi.TypeApiAuth['Restart'];
            }
            namespace Hook {
                type AuthStore = TypeHook.TypeAuthStore;
            }
        }
    }
}
