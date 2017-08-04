import Player from './Player';

export default interface JoinGameState {
    player: Player,
    attempt?: Attempt
}

export interface Attempt {
    success?: boolean,
    error?: Error
}