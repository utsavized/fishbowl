import IPlayer from '../interfaces/IPlayer';
import ICategory from '../interfaces/ICategory';
import IEntity from '../interfaces/IEntity';

export default class Game implements IEntity {
    constructor(public player: IPlayer, public categories: Array<ICategory>, public id: string, public name: string) {}
}