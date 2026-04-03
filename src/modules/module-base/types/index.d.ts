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
        namespace Api {
            type Response<Data, Metadata = Record<string, any>> = {
                message: string;
                data: Data;
                metadata: { timestamp: number } & Metadata;
            };
        }

        export import Data = TypeData;
        export import Store = TypeStore;
        export import Component = TypeComponent;
    }
}
