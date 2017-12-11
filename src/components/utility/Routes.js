import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';

import ShapesIndex from '../shapes/ShapesIndex';
import ShapesShow from '../shapes/ShapesShow';

import UsersIndex from '../users/UsersIndex';
import UsersShow from '../users/UsersShow';

// import RunsNew from '../runs/RunsNew';
import RunsShow from '../runs/RunsShow';
// import RunsEdit from '../runs/RunsEdit';
// import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/" component={ShapesIndex} />
      <Route path="/shapes/:id" component={ShapesShow} />
      <Route path="/users/:id" component={UsersShow} />
      <Route path="/users" component={UsersIndex} />
      {/* <Route path="/runs/new" component={RunsNew} /> */}
      <Route path="/runs/:id" component={RunsShow} />
      {/* <ProtectedRoute path="/runs/:id/edit" component={RunsEdit} /> */}
    </Switch>
  );
};

export default Routes;
