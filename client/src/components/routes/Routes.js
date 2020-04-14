import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Exercise from '../exercise/Exercise';

const Routes = () => (
  <section className="container">
    <Switch>
      <Route exact path="/exercises" component={Exercise} />
    </Switch>
  </section>
);

export default Routes;
