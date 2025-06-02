/**
 *
 * @author dongntd267@gmail.com
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
