import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Login from '../auth/Login';
// import Register from '../auth/Register';

import RunsIndex from '../runs/RunsIndex';
// import RunsShow from  '../dogs/RunsShow';
// import RunsNew from '../dogs/RunsNew';
// import RunsEdit from '../dogs/RunsEdit';
// import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <Switch>
      {/* <Route path="/login" component={Login} />
      <Route path="/register" component={Register} /> */}
      <Route exact path="/" component={RunsIndex} />
      {/* <ProtectedRoute path="/dogs/new" component={RunsNew} />
      <ProtectedRoute path="/dogs/:id/edit" component={RunsEdit} />
      <Route path="/dogs/:id" component={RunsShow} /> */}
    </Switch>
  );
};

export default Routes;
