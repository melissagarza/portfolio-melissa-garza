import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
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
      let chart = createExerciseChart({
        name: 'public',
        title: 'All Users'
      });
      chart.draw(exercises);

      // TESTING
      let exerciseChart = createExerciseChart({
        name: 'test',
        title: 'Test'
      });
      exerciseChart.draw(exercises, 'reps');

      if (isAuthenticated) {
        let exercisesUser = exercises.filter(exercise => exercise.user.alias === user.alias);
        let chartUser = createExerciseChart({
          name: 'user',
          title: 'You'
        });
        chartUser.draw(exercisesUser);
      }
    }
  }, [loading, exercises, isAuthenticated, user]);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      {isAuthenticated && (<div className="ec ec-user"></div>)}
      <div className="ec ec-test"></div>
      <div className="ec ec-public"></div>
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
