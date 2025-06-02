/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from './data.d';

declare global {
    namespace App.ModuleTheme {
        namespace Data {
            type Theme = TypeData.TypeTheme;
        }
    }
}
