import * as React from 'react';
import SlipInfo from './SlipInfo';
import ISlipProps from '../interfaces/ISlipProps';

export default class Slip extends React.Component<ISlipProps> {
    render() {
        return (
            <div>
                <input type="button" value="Show" onMouseDown={this.props.showSlip} />
                {!this.props.isHidden && 
                <SlipInfo 
                    category={this.props.slip && 
                        this.props.slip.category &&
                        this.props.slip.category.name || 'n/a'} 
                    value={this.props.slip && 
                        this.props.slip.name || 'n/a'} 
                />}
            </div>
        );
    }
}