/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeApi from './api.d';
import type * as TypeComponent from './component.d';
import type * as TypeHook from './hook.d';
import type * as TypeData from './data.d';

declare global {
    namespace App.ModuleBase {
        namespace Data {
            type Theme = TypeData.TypeTheme;
            type Locale = TypeData.TypeLocale;
            type Messages = TypeData.TypeMessages;
            type ItemIds = TypeData.TypeItemIds;
            type Items = TypeData.TypeItems;
            type StorageName = TypeData.TypeStorageName;
            type StoreValue = TypeData.TypeStoreValue;
        }
        namespace Api {
            type Payload<Data = unknown> = TypeApi.TypePayloadApi<Data>;
            type Response<Data = unknown> = TypeApi.TypeResponseApi<Data>;
        }
        namespace Hook {
            type NotifyStore = TypeHook.TypeNotifyStore;
        }
        namespace Component {
            type InputElement = TypeComponent.TypeInputElem;
        }
    }
}
