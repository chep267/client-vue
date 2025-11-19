/**
 *
 * @author dongntd267@gmail.com
 *
 */

type Method = 'get' | 'getList' | 'set' | 'setList' | 'remove' | 'removeList' | 'clearAll' | 'clearIgnoreKeys';

export default class StorageBase {
    constructor(storageName: App.ModuleBase.Data.StorageName) {
        this.storageName = storageName;
    }

    private readonly storageName: App.ModuleBase.Data.StorageName;

    private checkParams = (method: Method, variable: any, name: string) => {
        if (!variable) {
            throw new Error(`${this.storageName} -- ${method} :: no ${name}!`);
        }
    };

    get = (key: string) => {
        this.checkParams('get', key, 'storage key');
        return window[this.storageName].getItem(key) || '';
    };
    getList = (keys: string[]) => {
        this.checkParams('getList', keys, 'array storage key');
        const results: Record<string, App.ModuleBase.Data.StorageValue> = {};
        for (const key of keys) {
            results[key] = this.get(key);
        }
        return results;
    };

    set = (key: string, data: App.ModuleBase.Data.StorageValue) => {
        this.checkParams('set', key, 'storage key');
        this.checkParams('set', data, 'data');
        window[this.storageName].setItem(key, `${data || ''}`);
    };
    setList = (keys: string[], data: App.ModuleBase.Data.StorageValue[]) => {
        this.checkParams('setList', keys, 'array storage key');
        this.checkParams('setList', data, 'array data');
        keys.forEach((key, index) => this.set(key, data[index]));
    };

    remove = (key: string) => {
        this.checkParams('remove', key, 'storage key');
        window[this.storageName].removeItem(key);
    };
    removeList = (keys: string[]) => {
        this.checkParams('removeList', keys, 'array storage key');
        keys.forEach(this.remove);
    };

    clearAll = () => window[this.storageName].clear();
    clearIgnoreKeys = (keys: string[]) => {
        this.checkParams('clearIgnoreKeys', keys, 'array storage key');
        const ignoreData = this.getList(keys);
        this.clearAll();
        this.setList(keys, Object.values(ignoreData));
    };
}
