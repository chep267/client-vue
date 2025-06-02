/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type * as TypeApis from './api.d';
import type * as TypeComponents from './component.d';
import type * as TypeHooks from './hook.d';
import type * as TypeData from './data.d';

declare global {
    namespace App {
        namespace ModuleBase {
            namespace Apis {
                type Payload<Data = unknown> = TypeApis.TypePayloadApi<Data>;
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
    }
}
