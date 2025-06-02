/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type * as TypeHook from './hook.d';

declare global {
    namespace App {
        namespace ModuleGlobal {
            namespace Hook {
                type SiderState = TypeHook.TypeSiderState;
                type SiderStore = TypeHook.TypeSiderStore;
            }
        }
    }
}
