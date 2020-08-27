import React, { Fragment } from 'react';
import loading from '../../img/loading.gif';

const Loading = () => (
  <Fragment>
    <img className="loading-image" src={loading} alt="Loading..."/>
  </Fragment>
);

export default Loading;
