/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type * as TypeHooks from './hook.d';

declare global {
    namespace App {
        namespace ModuleGlobal {
            namespace Hooks {
                type SiderState = TypeHooks.TypeSiderState;
                type SiderStore = TypeHooks.TypeSiderStore;
            }
        }
    }
}
