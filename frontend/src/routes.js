import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home/index.jsx';
import Main from './pages/Main/index.jsx';

import { isAuthenticated } from './utils/auth.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/main" component={Main} />
    </Switch>
  </BrowserRouter>
)

export default Routes;