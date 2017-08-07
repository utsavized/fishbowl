import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Game from '../models/Game';
import Player from '../models/Player';
import JoinGameState from '../models/JoinGameState';
import GenericLocalStorageRepository from '../data/GenericLocalStorageRepository';
import ILocalStorageRepository from '../interfaces/ILocalStorageRepository'; 

export default class JoinGame extends React.Component<RouteComponentProps<any>, JoinGameState> { // tslint:disable-line
  private _gameRepository: ILocalStorageRepository<Game>; 
  private _game: Game;
  constructor(props: RouteComponentProps<any>) { // tslint:disable-line
    super(props);
    this._gameRepository = new GenericLocalStorageRepository<Game>();
    this.state = { player: new Player(0, '')};
    this._game = this.getGame(this.props.match.params.guid);

    this.getGame = this.getGame.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  getGame(guid: string) {
    return this._gameRepository.get(guid);
  }

  updateUser(e: any) { // tslint:disable-line
    this.state.player.name = e.target.value;
    this.setState(this.state);
  }

  joinGame() {
    // TODO: connect to backend
    // update game
    try {
      this._game.players.push(this.state.player);
      this._gameRepository.remove(this._game.name);
      this._gameRepository.add(this._game.name, this._game);
      const url = '/slips/' + this._game.name + '/user/' + this.state.player.name;
      history.pushState(null, 'Slips', url);
      this.setState({
        player: this.state.player,
        attempt: { success: true }
      });
    } catch (e) {
      this.setState({
        player: this.state.player,
        attempt: {
          success: true,
          error: e
        }
      });
    }

    this.setState(this.state);
  }

  render() {
    if (this._game.name === undefined) {
      return <div>Invalid game</div>;
    }

    if (this._game.started) {
      return <div>Cannot join, game have already started.</div>;
    }

    if (this.state.attempt !== undefined && this.state.attempt.success) {
      const url = '/slips/' + this._game.name  + '/user/' + this.state.player.name;
      return <Redirect to={url} />;
    }

    if (this.state.attempt !== undefined && !this.state.attempt.success) {
      return (
        <div>
          Error joining game
          <p>{this.state.attempt.error}</p>
        </div>
      );
    }

    return (
      <div>
          <p>Game {this._game.name},
             created by {this._game.creator.name}&nbsp;
             with categories:&nbsp;
             {this._game.categories.map(category => <span key={category.name}>{category.name} </span>)}
          </p>
           Joined players:
          <ul>
            {this._game.players.map(player => <li key={player.name}>{player.name}</li>)}
          </ul> 
          Enter usename: <input type="text" onChange={this.updateUser} value={this.state.player.name} />
          <button onClick={this.joinGame}>Join Game</button>
      </div>
    );
  }
}