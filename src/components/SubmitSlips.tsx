import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Game from '../models/Game';
import GenericLocalStorageRepository from '../data/GenericLocalStorageRepository';
import ILocalStorageRepository from '../interfaces/ILocalStorageRepository'; 
import Slip from '../models/Slip';
import ISubmitSlipsState from '../interfaces/ISubmitSlipsState';

export default class SubmitSlips extends React.Component<RouteComponentProps<any>, ISubmitSlipsState> { // tslint:disable-line
  private _gameRepository: ILocalStorageRepository<Game>; 
  constructor(props: RouteComponentProps<any>) { // tslint:disable-line
    super(props);
    this._gameRepository = new GenericLocalStorageRepository<Game>();
    
    this.getGame = this.getGame.bind(this);
    this.submitSlips = this.submitSlips.bind(this);

    let currentGame = this.getGame(this.props.match.params.guid);
    this.state = {
      game:  currentGame,
      slips: currentGame.categories.map(cat => new Slip(0, '', cat)),
      user: this.props.match.params.user,
      submitted: false
    };
  }

  getGame(guid: string) {
    return this._gameRepository.get(guid);
  }

  updateSlips(e: any, index: number) { // tslint:disable-line
    this.state.slips[index].name = e.target.value;
    this.setState(this.state);
  }

  submitSlips() {
    let savedGame = this.getGame(this.state.game.name);
    this.state.slips.forEach(function(slip: Slip){
      slip.id = savedGame.slips.length;
      savedGame.slips.push(slip);
    });
    this._gameRepository.remove(savedGame.name);
    this._gameRepository.add(savedGame.name, savedGame);
    const url = '/wait/' + savedGame.name + '/user/' + this.state.user;
    history.pushState(null, 'Wait', url);
    this.setState({
      game: savedGame,
      slips: this.state.slips,
      submitted: true
    });
  }

  render() {
    if (this.state.game.name === undefined) {
      return <div>Invalid game</div>;
    }

    if (this.state.submitted) {
       const url = '/wait/' + this.state.game.name + '/user/' + this.state.user;
       return <Redirect to={url} />;
    }

    if (this.state.game.started) {
      const url = '/play/' + this.state.game.name;
      return <Redirect to={url} />;
    }

    return (
      <div>
          <p>Playing {this.state.game.name}</p>
          Categories:
          <ul>
          {this.state.slips.map((slip, index) => 
            <div key={slip.category.name}>
              <li>{slip.category.name} </li>
              <input 
                type="text" 
                onChange={evt => this.updateSlips(evt, index)}
                value={slip.name}
              />
            </div>)}
          </ul>
          <button onClick={this.submitSlips}>Add slips to the bowl</button>
      </div>
    );
  }
}