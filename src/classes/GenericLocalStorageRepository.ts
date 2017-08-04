import IEntity from '../interfaces/IEntity';
import ILocalStorageRepository from '../interfaces/ILocalStorageRepository';

export default class GenericLocalStorageRepository<T extends IEntity> implements ILocalStorageRepository<T> {
    private _context: Storage;
    constructor() {
        this._context = localStorage;
    }

    add(key: string, data: T): void {
        this._context.setItem(key, JSON.stringify(data));
    }

    remove(key: string): T {
        var data = this._context.getItem(key);
        this._context.removeItem(key);
        return JSON.parse(data === null ? '{}' : data);
    }

    get(key: string): T {
        var data = this._context.getItem(key);
        return JSON.parse(data === null ? '{}' : data);
    }
}