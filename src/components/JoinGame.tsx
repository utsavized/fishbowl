import * as React from 'react';
// import { Redirect } from 'react-router-dom';
import Game from '../models/Game';
import GenericLocalStorageRepository from '../data/GenericLocalStorageRepository';
import ILocalStorageRepository from '../interfaces/ILocalStorageRepository'; 

export default class JoinGame extends React.Component<{}, Game> {
  private _gameRepository: ILocalStorageRepository<Game>; 
  constructor(props: {}) {
    super(props);
    this._gameRepository = new GenericLocalStorageRepository<Game>();
    this.state = {
      id: 0,
      name: '',
      player: { id: 0, name: '' },
      categories: []
    };
  }
  
  render() {
    return (
      <div>
          <p>Join the game here</p>
      </div>
    );
  }
}