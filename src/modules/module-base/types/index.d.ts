/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type * as TypeApis from './apis.d';
import type * as TypeComponents from './components.d';
import type * as TypeHooks from './hooks.d';
import type * as TypeData from './data.d';

declare global {
    namespace App {
        namespace ModuleBase {
            namespace Apis {
                type Payload<Data = unknown> = TypeApis.TypeCallApiPayload<Data>;
                type Response<Data = unknown> = TypeApis.TypeResponseApi<Data>;
            }
            namespace Components {
                type InputElement = TypeComponents.TypeInputElem;
            }
            namespace Hooks {
                type NotifyStore = TypeHooks.TypeNotifyStore;
            }
            namespace Data {
                type ItemIds = TypeData.TypeItemIds;
                type Items = TypeData.TypeItems;
                type StorageName = TypeData.TypeStorageName;
                type StoreValue = TypeData.TypeStoreValue;
            }
        }
        namespace ModuleLanguage {
            namespace Data {
                type Locale = 'vi' | 'en';
                type Messages = Record<string, string>;
            }
        }
        namespace ModuleTheme {
            namespace Data {
                type Theme = 'dark' | 'light';
            }
        }
    }
}
