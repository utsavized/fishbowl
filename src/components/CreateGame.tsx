import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Game from '../models/Game';
import Category from '../models/Category';
import GenericLocalStorageRepository from '../data/GenericLocalStorageRepository';
import ILocalStorageRepository from '../interfaces/ILocalStorageRepository'; 

export default class CreateGame extends React.Component<{}, Game> {
  private _gameRepository: ILocalStorageRepository<Game>; 
  constructor(props: {}) {
    super(props);
    this._gameRepository = new GenericLocalStorageRepository<Game>();
    this.state = {
      id: 0,
      name: '',
      creator: { id: 0, name: '' },
      categories: [],
      players: [],
      slips: [],
      started: false
    };

    this.updateUser = this.updateUser.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.createGame = this.createGame.bind(this);
  }
  
  updateUser(e: any) { // tslint:disable-line
    this.state.creator.name = e.target.value;
    this.setState(this.state);
  }

  addCategory(e: any) { // tslint:disable-line
    if (e.which === 13) {
      this.state.categories.push(new Category(0, e.target.value));
      this.setState(this.state);
      e.target.value = '';
    }
  }

  createGame() {
    // TODO: connect to backend
    // receive game guid
    const gameGuid = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    const game = new Game(0, gameGuid, this.state.creator, this.state.categories, [this.state.creator], [], false);
    this._gameRepository.add(gameGuid, game);
    const url = '/slips/' + gameGuid + '/user/' + this.state.creator.name;
    history.pushState(null, 'Slips', url);
    this.setState(game);
  }

  render() {
    if (this.state.name) {
      const url = '/slips/' + this.state.name + '/user/' + this.state.creator.name;
      return <Redirect to={url} />;
    }

    return (
      <div>
          <p>User: {this.state.creator.name}</p>
          Categories:
          <ul>
            {this.state.categories.map(category =>
              <li key={category.name}>{category.name}</li>
            )}
          </ul>
          Enter username
          <input type="text" onChange={this.updateUser} value={this.state.creator.name}/>
          <br />
          Enter Category <input id="category--input" type="text" onKeyPress={this.addCategory}/>
          <br />
          <button onClick={this.createGame}>Create Game</button>
      </div>
    );
  }
}