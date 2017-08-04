import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Game from '../models/Game';
import GenericLocalStorageRepository from '../data/GenericLocalStorageRepository';
import ILocalStorageRepository from '../interfaces/ILocalStorageRepository'; 

export default class WaitGame extends React.Component<RouteComponentProps<any>, Game> { // tslint:disable-line
  private _gameRepository: ILocalStorageRepository<Game>; 
  constructor(props: RouteComponentProps<any>) { // tslint:disable-line
    super(props);
    this._gameRepository = new GenericLocalStorageRepository<Game>();
    
    this.getGame = this.getGame.bind(this);
    this.startGame = this.startGame.bind(this);

    this.state = this.getGame(this.props.match.params.guid);
    setInterval(() => { this.setState(this.getGame(this.props.match.params.guid)); }, 1000);
  }

  getGame(guid: string) {
    return this._gameRepository.get(guid);
  }

  startGame() {
    let game = this.getGame(this.state.name);
    game.started = true;
    this._gameRepository.remove(game.name);
    this._gameRepository.add(game.name, game);
    this.setState(game);
  }

  render() {
    if (this.state.name === undefined) {
      return <div>Invalid game</div>;
    }

    if (this.state.started) {
      const url = '/play/' + this.state.name;
      return <Redirect to={url} />;
    }

    const adminButton = this.props.match.params.user === this.state.creator.name
          ? <button onClick={this.startGame}>Start Game</button>
          : <p>Waiting for {this.state.creator.name} to start the game...</p>;

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
          {adminButton}
      </div>
    );
  }
}