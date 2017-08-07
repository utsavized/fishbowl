import * as React from 'react';
import ISlipInfoProps from '../interfaces/ISlipInfoProps';

export default class SlipInfo extends React.Component<ISlipInfoProps> {
    render() {
        return (
            <div>
                <div>{this.props.category}</div>
                <div>{this.props.value}</div>
            </div>
        );
    }
}