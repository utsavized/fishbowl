import * as React from 'react';
import RoundInfo from './RoundInfo';
import Slip from './Slip';
import SlipActions from './SlipActions';  
import Round from '../models/Round';
import ILocalStorageRepository from '../interfaces/ILocalStorageRepository';
import Game from '../models/Game';
import GenericLocalStorageRepository from '../data/GenericLocalStorageRepository';
import { RouteComponentProps } from 'react-router';

export default class ActivePlayer extends React.Component<RouteComponentProps<any>, Round> { // tslint:disable-line
     private _gameRepository: ILocalStorageRepository<Game>; 
    constructor(props: RouteComponentProps<any>) { // tslint:disable-line
        super(props);
        this._gameRepository = new GenericLocalStorageRepository<Game>();
        
        let currentGame = this.getGame(this.props.match.params.guid);
        // Set up initial state
        this.state = {
            id: 0,
            name: 'testRound',
            remainingSlips: currentGame.slips,
            roundScore: 0,
            isSlipHidden: true,
            isStarted: false,
            isEnded: false,
            roundTimerSeconds: 60.0
        };

        // Functions must be bound manually with ES6 classes
        this.getGame = this.getGame.bind(this);
        this.startRound = this.startRound.bind(this);
        this.decrementTimer = this.decrementTimer.bind(this);
        this.render = this.render.bind(this);
        // this.getSlipsForRound = this.getSlipsForRound.bind(this);
        this.showSlip = this.showSlip.bind(this);
        this.hideSlip = this.hideSlip.bind(this);
        this.onPark = this.onPark.bind(this);
        this.onCorrect = this.onCorrect.bind(this);

        // this.getSlipsForRound();
    }

    getGame(guid: string) {
    return this._gameRepository.get(guid);
  }

    // getSlipsForRound() {
    //     // fetch('/slips', {
    //     //     method: 'get'
    //     // }).then(function (response) {
    //     //     return response.json();
    //     // }).then((data) => {
    //     //     console.log(data);
    //     //     this.setState({ remainingSlips: data });
    //     // }).catch(function (err) {
    //     //     console.log(err);
    //     // });
    //     setTimeout(() => {
    //         var slips = [
    //         {id: 1, name: 'The Rock', category: {id: 1, name: 'Movies'}},
    //         {id: 2, name: 'Sean Connery', category: {id: 2, name: 'Actors'}},
    //         {id: 3, name: 'Inception', category: {id: 1, name: 'Movies'}},
    //         {id: 4, name: 'Christian Bale', category: {id: 2, name: 'Actors'}},
    //         ];
    //         this.setState({remainingSlips: slips});
    //     }, 30);
    // }

    startRound() {
        setTimeout(setInterval(this.decrementTimer, 100), 1000);
        var nextSlip = this.state.remainingSlips.pop();
        this.setState({
            isStarted: true,
            currentSlip: nextSlip
        });
    }

    decrementTimer() {
        var newTime = parseFloat((this.state.roundTimerSeconds - 0.1).toFixed(1));
        if (newTime < 0.0) {
            newTime = 0.0;
        }
        if (newTime === 0.0 && !this.state.isEnded) {
            this.setState({
                isEnded: true,
                roundTimerSeconds: newTime
            });
        }else if (this.state.isStarted && !this.state.isEnded) {
            this.setState({
                roundTimerSeconds: newTime
            });
        }
    }

    showSlip() {
        this.setState({
            isSlipHidden: false
        });
    }

    hideSlip() {
        this.setState({
            isSlipHidden: true
        });
    }

    onPark() {
        var alreadyParked = this.state.parked;
        var newParked = this.state.currentSlip;
        if (alreadyParked != null) {
            this.setState({
                currentSlip: alreadyParked,
                parked: newParked
            });
        }else if (alreadyParked == null) {
            if (this.state.remainingSlips.length === 0) {
                return;
            }
            var nextSlip = this.state.remainingSlips.pop();
            this.setState({
                parked: newParked,
                currentSlip: nextSlip
            });
        }
    }

    onCorrect() {
        if (this.state.isEnded) {
            return;
        }
        var newScore = this.state.roundScore + 1;
        if (this.state.remainingSlips.length > 0) {
            var newSlip = this.state.remainingSlips.pop();
            this.setState({
                currentSlip: newSlip,
                roundScore: newScore
            });
        } else {
            // first check if there is anything parked
            if (this.state.parked != null) {
                var alreadyParked = this.state.parked;
                this.setState({
                    currentSlip: alreadyParked,
                    roundScore: newScore,
                    parked: undefined
                });
            } else {
                // if not, round over!
                this.setState({
                    isEnded: true,
                    roundScore: newScore
                });
            }
        }
    }

    render() {
        return (
            <div>
                {!this.state.isStarted &&
                    <div>
                        <input type="button" onClick={this.startRound} value="Start Round" />
                    </div>}
                {this.state.isStarted && !this.state.isEnded &&
                    <div onMouseUp={this.hideSlip}>
                        <RoundInfo score={this.state.roundScore} time={this.state.roundTimerSeconds} />
                        <SlipActions onCorrectClick={this.onCorrect} onParkClick={this.onPark}/>
                        <Slip 
                            slip={this.state.currentSlip} 
                            isHidden={this.state.isSlipHidden} 
                            showSlip={this.showSlip}
                        />
                    </div>}
                {this.state.isEnded &&
                    <div>
                        Round Over!
                    </div>}
            </div>
        );
    }
}