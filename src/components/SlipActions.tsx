import * as React from 'react';
import ISlipActionProps from '../interfaces/ISlipActionProps';

export default class SlipActions extends React.Component<ISlipActionProps, any> { // tslint:disable-line
    render() {
        return (
            <div>
                <input type="button" value="Park" onClick={this.props.onParkClick} />
                <input type="button" value="Correct" onClick={this.props.onCorrectClick} />
            </div>
        );
    }
}