/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from '@module-base/types/data.d';
import type * as TypeComponent from '@module-base/types/component.d';
import type * as TypeStore from '@module-base/types/store.d';

declare global {
    namespace App.ModuleBase {
        namespace Data {
            type Theme = TypeData.TypeTheme;
            type Locale = TypeData.TypeLocale;
            type Messages = TypeData.TypeMessages;
            type ItemIds = TypeData.TypeItemIds;
            type Items<Data = any> = TypeData.TypeItems<Data>;
            type StorageName = TypeData.TypeStorageName;
            type StorageValue = TypeData.TypeStorageValue;
        }
        namespace Store {
            type NotifyStore = TypeStore.TypeNotifyStore;
        }
        namespace Component {
            type InputElement = TypeComponent.TypeInputElem;
        }
    }
}
