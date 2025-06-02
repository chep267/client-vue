/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** types */
import type * as TypeApi from './api.d';
import type * as TypeComponent from './component.d';
import type * as TypeHook from './hook.d';
import type * as TypeData from './data.d';

declare global {
    namespace App {
        namespace ModuleBase {
            namespace Api {
                type Payload<Data = unknown> = TypeApi.TypePayloadApi<Data>;
                type Response<Data = unknown> = TypeApi.TypeResponseApi<Data>;
            }
            namespace Component {
                type InputElement = TypeComponent.TypeInputElem;
            }
            namespace Hook {
                type NotifyStore = TypeHook.TypeNotifyStore;
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
