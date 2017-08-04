import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Game from '../models/Game';
import GenericLocalStorageRepository from '../data/GenericLocalStorageRepository';
import ILocalStorageRepository from '../interfaces/ILocalStorageRepository'; 

export default class PlayGame extends React.Component<RouteComponentProps<any>, Game> { // tslint:disable-line
  private _gameRepository: ILocalStorageRepository<Game>; 
  constructor(props: RouteComponentProps<any>) { // tslint:disable-line
    super(props);
    this._gameRepository = new GenericLocalStorageRepository<Game>();
    this.state = this.getGame(this.props.match.params.guid);
  }

  getGame(guid: string) {
    return this._gameRepository.get(guid);
  }

  render() {
    if (this.state.id === undefined) {
      return <div>Invalid game</div>;
    }

    return (
      <div>
          <p>Playing {this.state.name},&nbsp;
             created by {this.state.player.name}&nbsp;
             with categories&nbsp;
             {this.state.categories.map(category => <span key={category.name}>{category.name} </span>)}.
          </p>
      </div>
    );
  }
}