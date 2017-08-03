import * as React from 'react';
import '../css/App.css';

import PlayerBoard from './PlayerBoard';

class App extends React.Component<{}, {name: string}> {
  render() {
    return (
      <div>
          <PlayerBoard />
      </div>
    );
  }
}

export default App;
