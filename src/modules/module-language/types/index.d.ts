/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type * as TypeData from './data.d';

declare global {
    namespace App {
        namespace ModuleLanguage {
            namespace Data {
                type Locale = TypeData.TypeLocale;
                type Messages = TypeData.TypeMessages;
            }
        }
    }
}
