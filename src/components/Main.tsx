import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateGame from './CreateGame';
import PlayGame from './PlayGame';
import JoinGame from './JoinGame';
import Home from './Home';

export default class Main extends React.Component {
    render() {
        return (
            <Switch>
              <Route exact={true} path="/" component={Home}/>
              <Route exact={true} path="/create" component={CreateGame}/>
              <Route path="/join" component={JoinGame}/>
              <Route path="/play/:guid" component={PlayGame}/>
            </Switch>
        );
    }
}