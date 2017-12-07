import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';

import RunsIndex from '../runs/RunsIndex';
// import RunsShow from  '../runs/RunsShow';
// import RunsNew from '../runs/RunsNew';
// import RunsEdit from '../runs/RunsEdit';
// import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/" component={RunsIndex} />
      {/* <ProtectedRoute path="/runs/new" component={RunsNew} />
      <ProtectedRoute path="/runs/:id/edit" component={RunsEdit} />
      <Route path="/runs/:id" component={RunsShow} /> */}
    </Switch>
  );
};

export default Routes;
