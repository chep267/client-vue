/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from './data.d';

declare global {
    namespace App.ModuleLanguage {
        namespace Data {
            type Locale = TypeData.TypeLocale;
            type Messages = TypeData.TypeMessages;
        }
    }
}
