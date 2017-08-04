import IEntity from '../interfaces/IEntity';

export default class Category implements IEntity {
    constructor(public id: number, public name: string) {}
}