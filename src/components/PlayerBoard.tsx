import * as React from 'react';

import IPlayer from '../interfaces/IPlayer';
import IPlayerBoardState from '../interfaces/IPlayerBoardState';

export default class PlayerBoard extends React.Component<{}, IPlayerBoardState> {
    constructor() {
        super();
        this.state = { players: this.getPlayers() };
        
        this.getPlayers = this.getPlayers.bind(this);
    }
    
    // TODO: connect to ajax later
    getPlayers(): Array<IPlayer> {
        return [
            { id: 1, name: 'Utsav' },
            { id: 2, name: 'Jordan' }
        ];
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.players.map(player =>
                        <li key={player.id}>{player.name}</li>
                    )}
                </ul>
            </div>
        );
    }
}