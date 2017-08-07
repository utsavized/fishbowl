import * as React from 'react';
import IScoreProps from '../interfaces/IScoreProps';

export default class Score extends React.Component<IScoreProps> {
    render() {
        return (
            <div>Score: {this.props.value}</div>
        );
    }
}