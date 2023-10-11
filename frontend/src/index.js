import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteConfig from './RouteConfig'

ReactDOM.render(
  <Router>
    <RouteConfig />
  </Router>,
  document.getElementById('root')
);
