import * as React from 'react';

export default class HelloMessage extends React.Component<{name: string}> {
    render() {
        return <div>Hello, {this.props.name}</div>;
    }
}