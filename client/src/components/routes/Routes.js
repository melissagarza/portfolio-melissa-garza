import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Exercises from '../workout/Exercises';

const Routes = () => (
  <section className="container">
    <Switch>
      <Route exact path="/exercises" component={Exercises} />
    </Switch>
  </section>
);

export default Routes;
