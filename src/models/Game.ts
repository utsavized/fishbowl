import Player from './Player';
import Category from './Category';
import IEntity from '../interfaces/IEntity';

export default class Game implements IEntity {
    constructor(public id: number, public name: string, public player: Player, public categories: Array<Category>) {}
}