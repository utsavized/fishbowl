import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Game from '../classes/Game';
import GenericLocalStorageRepository from '../classes/GenericLocalStorageRepository';
import ILocalStorageRepository from '../interfaces/ILocalStorageRepository'; 

export default class CreateGame extends React.Component<{}, Game> {
  private _gameRepository: ILocalStorageRepository<Game>; 
  constructor() {
    super();
    this._gameRepository = new GenericLocalStorageRepository<Game>();
    this.state = {
      id: '',
      name: '',
      player: { id: '', name: '' },
      categories: []
    };

    this.updateUser = this.updateUser.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.createGame = this.createGame.bind(this);
  }
  
  updateUser(e: any) {
    this.state.player.name = e.target.value;
    this.setState({
      player: this.state.player,
      categories: this.state.categories
    });
  }

  addCategory(e: any) {
    if (e.which === 13) {
      this.state.categories.push({ name: e.target.value });
      this.setState({
        player: this.state.player,
        categories: this.state.categories
      });
      e.target.value = '';
    }
  }

  createGame() {
    // TODO: connect to backend
    // receive game guid
    const gameGuid = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    const game = new Game(this.state.player, this.state.categories, gameGuid, 'Fish Bowl');
    this._gameRepository.add(gameGuid, game);
    const url = '/play/' + gameGuid;
    history.pushState(null, 'Play', url);
    this.setState(game);
  }

  render() {
    if (this.state.id) {
      const url = '/play/' + this.state.id;
      return <Redirect to={url} />;
    }

    return (
      <div>
          <p>User: {this.state.player.name}</p>
          Categories:
          <ul>
            {this.state.categories.map(category =>
              <li key={category.name}>{category.name}</li>
            )}
          </ul>
          Enter username
          <input type="text" onChange={this.updateUser} value={this.state.player.name}/>
          <br />
          Enter Category <input id="category--input" type="text" onKeyPress={this.addCategory}/>
          <br />
          <button onClick={this.createGame}>Create Game</button>
      </div>
    );
  }
}