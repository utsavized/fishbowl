import IEntity from '../interfaces/IEntity';

export default class Player implements IEntity { 
    constructor(public id: number, public name: string) {}
}