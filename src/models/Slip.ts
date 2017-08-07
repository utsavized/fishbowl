import IEntity from '../interfaces/IEntity';
import Category from "./Category";

export default class Slip implements IEntity {
    constructor(
        public id: number,
        public name: string,
        public category: Category
    ){}
}
