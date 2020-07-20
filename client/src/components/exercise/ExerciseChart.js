import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import { createChart } from '../../utils/chart';
import { createExerciseChart } from '../../utils/exerciseChart';

const ExerciseChart = ({
  auth: {
    isAuthenticated,
    user
  },
  exercise: {
    exercise,
    exercises,
    loading
  }}) => {

  useEffect(() => {
    if (!loading) {
      let chart = createChart('public', exercises, 'All Users');
      chart.draw();

      // TESTING
      let exerciseChart = createExerciseChart({
        name: 'test-chart',
        title: 'Test Exercise Chart'
      });
      exerciseChart.draw(exercises, 'volume');

      if (isAuthenticated) {
        let exercisesUser = exercises.filter(exercise => exercise.user.alias === user.alias);
        let chartUser = createChart('user', exercisesUser, 'You');
        chartUser.draw();
      }
    }
  }, [loading, exercises, isAuthenticated, user]);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      {isAuthenticated && (<div className="container-user"></div>)}
      <div className="container-public"></div>
    </Fragment>
  );
};

ExerciseChart.propTypes = {
  auth: PropTypes.object.isRequired,
  exercise: PropTypes.object,
  exercises: PropTypes.object
};

const mapStateToProps = ({ auth, exercise }) => ({ auth, exercise });

export default connect(mapStateToProps, {})(ExerciseChart);
