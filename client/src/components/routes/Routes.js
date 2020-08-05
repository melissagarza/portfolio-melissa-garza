import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Resume from '../layout/Resume';
import Exercise from '../exercise/Exercise';
import Roadmap from '../roadmap/Roadmap';

const Routes = () => (
  <Switch>
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/resume" component={Resume} />
    <Route exact path="/exercises" component={Exercise} />
    <Route exact path="/roadmap" component={Roadmap} />
  </Switch>
);

export default Routes;
