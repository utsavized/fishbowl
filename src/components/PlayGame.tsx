import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Game from '../models/Game';
import GenericLocalStorageRepository from '../data/GenericLocalStorageRepository';
import ILocalStorageRepository from '../interfaces/ILocalStorageRepository'; 

export default class PLayGame extends React.Component<RouteComponentProps<any>, Game> { // tslint:disable-line
  private _gameRepository: ILocalStorageRepository<Game>; 
  constructor(props: RouteComponentProps<any>) { // tslint:disable-line
    super(props);
    this._gameRepository = new GenericLocalStorageRepository<Game>();
    
    this.getGame = this.getGame.bind(this);
    this.state = this.getGame(this.props.match.params.guid);
  }

  getGame(guid: string) {
    return this._gameRepository.get(guid);
  }

  render() {
    if (this.state.name === undefined) {
      return <div>Invalid game</div>;
    }

    return (
      <div>
          <p>Playing {this.state.name}</p>
          Categories:
          <ul>
          {this.state.categories.map(category => <li key={category.name}>{category.name} </li>)}
          </ul>
          Joined players:
          <ul>
            {this.state.players.map(player => <li key={player.name}>{player.name} </li>)}
          </ul>
          <br />
          <h2>Enjoy!</h2>          
      </div>
    );
  }
}