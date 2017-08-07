import Player from './Player';
import IEntity from '../interfaces/IEntity';
import Slip from "./Slip";

export default class Round implements IEntity {
    constructor(
        public id: number,
        public name: string,
        public remainingSlips: Array<Slip>,
        public roundScore = 0,
        public isSlipHidden = true,
        public isStarted = false,
        public isEnded = false,
        public roundTimerSeconds = 60.0,
        public activePlayer?: Player,
        public currentSlip?: Slip,
        public parked?: Slip,
    ){}
}
