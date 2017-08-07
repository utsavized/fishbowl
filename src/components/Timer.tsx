import * as React from 'react';
import ITimerProps from '../interfaces/ITimerProps';

export default class Timer extends React.Component<ITimerProps> {
    render() {
        return (
            <div>{this.props.time}s</div>
        );
    }
}