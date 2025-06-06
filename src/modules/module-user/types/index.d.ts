/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from './data.d';

declare global {
    namespace App.ModuleUser {
        namespace Data {
            type User = TypeData.TypeUser;
        }
    }
}
