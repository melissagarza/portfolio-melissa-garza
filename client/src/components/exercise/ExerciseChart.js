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
    exerciseFocus,
    loading
  }}) => {

  const chartAllUsers = createExerciseChart({
    name: 'public',
    title: 'All Users'
  });
  const chartUser = createExerciseChart({
    name: 'user',
    title: 'You'
  });

  useEffect(() => {
    if (!loading) {
      chartAllUsers.draw(exercises, exerciseFocus);

      if (isAuthenticated) {
        let exercisesUser = exercises.filter(exercise => exercise.user.alias === user.alias);
        chartUser.draw(exercisesUser, exerciseFocus);
      }
    }
  }, [
    loading,
    chartAllUsers,
    chartUser,
    exercises,
    exerciseFocus,
    isAuthenticated,
    user
  ]);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      {isAuthenticated && (<div className="ec ec-user"></div>)}
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
