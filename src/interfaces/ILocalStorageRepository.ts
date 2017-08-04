export default interface ILocalStorageRepository<T> {
    add(key: string, data: T): void,
    remove(key: string): T,
    get(key: string): T
}