import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';

import ShapesIndex from '../shapes/ShapesIndex';
import ShapesShow from '../shapes/ShapesShow';
import ShapesSubmit from '../shapes/ShapesSubmit';

import UsersIndex from '../users/UsersIndex';
import UsersShow from '../users/UsersShow';

import RunsShow from '../runs/RunsShow';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute path="/shapes/:id/submit" component={ShapesSubmit} />
      <ProtectedRoute path="/shapes/:id" component={ShapesShow} />
      <Route exact path="/shapes" component={ShapesIndex} />
      <ProtectedRoute path="/users/:id" component={UsersShow} />
      <ProtectedRoute path="/users" component={UsersIndex} />
      <ProtectedRoute path="/runs/:id" component={RunsShow} />
    </Switch>
  );
};

export default Routes;
