import * as React from 'react';
import '../css/App.css';

import HelloMessage from './HelloMessage';
import IEvent from '../interfaces/IEvent';

class App extends React.Component<{}, {name: string}> {
  constructor() {
    super();
    this.state = { name: 'Utsav' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: IEvent) {
    this.setState({name: e.target.value});
  }

  render() {
    return (
      <div>
          <HelloMessage name={this.state.name} />
          <input value={this.state.name} onChange={this.handleChange}/>
      </div>
    );
  }
}

export default App;
