import Player from './Player';
import Category from './Category';
import IEntity from '../interfaces/IEntity';

export default class Game implements IEntity {
    constructor(
        public id: number,
        public name: string,
        public creator: Player,
        public categories: Array<Category>,
        public players: Array<Player>,
        public started: boolean) {}
}