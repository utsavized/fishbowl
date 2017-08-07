import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateGame from './CreateGame';
import WaitGame from './WaitGame';
import JoinGame from './JoinGame';
import PlayGame from './PlayGame';
import Home from './Home';
import ActivePlayer from './ActivePlayer';
import SubmitSlips from './SubmitSlips';

export default class Main extends React.Component {
    render() {
        return (
            <div className="container row">
                <Switch>
                <Route exact={true} path="/" component={Home}/>
                <Route exact={true} path="/create" component={CreateGame}/>
                <Route path="/wait/:guid/user/:user" component={WaitGame}/>
                <Route path="/join/:guid" component={JoinGame}/>
                <Route path="/play/:guid" component={PlayGame}/>
                <Route path="/slips/:guid/user/:user" component={SubmitSlips}/>
                <Route path="/active/:guid" component={ActivePlayer}/>
                </Switch>
            </div>
        );
    }
}