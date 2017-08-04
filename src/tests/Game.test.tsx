import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from '../components/Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
});
