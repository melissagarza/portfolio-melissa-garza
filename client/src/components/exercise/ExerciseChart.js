import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import { createChart } from '../../utils/chart';

const ExerciseChart = ({ exercise: { exercise, exercises, loading } }) => {

  useEffect(() => {
    if (!loading) {
      let chart = createChart('public', exercises);
      chart.draw();
    }
  }, [loading, exercises]);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="container-public"></div>
    </Fragment>
  );
};

ExerciseChart.propTypes = {
  exercise: PropTypes.object,
  exercises: PropTypes.object
};

const mapStateToProps = ({ exercise }) => ({ exercise });

export default connect(mapStateToProps, {})(ExerciseChart);
