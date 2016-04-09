import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store/configureStore';

import App from './containers/app/App';
import RestrictPage from './containers/misc/RestrictPage';
import Home from './containers/home/Home';
import About from './containers/about/About';
import NotFound from './containers/misc/NotFound';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/about" component={About} />
          {/* <Route component={RestrictPage}>
          </Route> */}

          <Route path="*" component={NotFound} />
      </Route>
      </Router>
  </Provider>,
  document.getElementById('app')
);
