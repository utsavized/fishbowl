import Game from '../models/Game';
import Slip from '../models/Slip';

export default interface ISubmitSlipsState {
    game: Game,
    slips: Array<Slip>,
    user: string,
    submitted: boolean
}