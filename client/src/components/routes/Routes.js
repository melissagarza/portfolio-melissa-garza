import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Exercises from '../exercise/Exercises';

const Routes = () => (
  <section className="container">
    <Switch>
      <Route exact path="/exercises" component={Exercises} />
    </Switch>
  </section>
);

export default Routes;
