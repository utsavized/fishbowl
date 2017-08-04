import * as Router from 'react-router-dom';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Game from './components/Game';
import './css/main.css';

ReactDOM.render(
  <Router.BrowserRouter>
    <Game />
  </Router.BrowserRouter>,
  document.getElementById('game') as HTMLElement
);
registerServiceWorker();