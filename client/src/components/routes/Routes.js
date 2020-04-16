import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Exercise from '../exercise/Exercise';

const Routes = () => (
  <Switch>
    <Route exact path="/exercises" component={Exercise} />
  </Switch>
);

export default Routes;
