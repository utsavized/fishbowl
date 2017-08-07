import * as React from 'react';
import Timer from './Timer';
import Score from './Score';
import IRoundInfoProps from '../interfaces/IRoundInfoProps';

export default class RoundInfo extends React.Component<IRoundInfoProps> {
    render() {
        return(
            <div>
                <Timer time={this.props.time} />
                <Score value={this.props.score} />
            </div>
        );
    }
}