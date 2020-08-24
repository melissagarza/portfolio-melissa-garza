import React, { Fragment, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../layout/Loading';
import { createExerciseChart } from '../../utils/exerciseChart';

const ExerciseChart = () => {

  const chartAllUsersRoot = useRef(null);
  const chartAllUsers = useRef(null);
  const chartUserRoot = useRef(null);
  const chartUser = useRef(null);

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const {
    loading,
    exercises,
    exerciseFocus
  } = useSelector(state => state.exercise);

  useEffect(() => {
    if (!loading) {
      if (chartAllUsers.current === null) {
        chartAllUsers.current = createExerciseChart(
          chartAllUsersRoot,
          'public',
          'All Users'
        );
      }
      chartAllUsers.current.draw(exercises, exerciseFocus);
      if (isAuthenticated) {
        if (chartUser.current === null) {
          chartUser.current = createExerciseChart(
            chartUserRoot,
            'user',
            'You'
          );
        }
        let exercisesUser = exercises.filter(exercise => exercise.user.alias === user.alias);
        chartUser.current.draw(exercisesUser, exerciseFocus);
      }
    }
  }, [loading, isAuthenticated, exercises, exerciseFocus, user]);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      {isAuthenticated && (<div ref={chartUserRoot} className="ec ec-user"></div>)}
      <div ref={chartAllUsersRoot} className="ec ec-public"></div>
    </Fragment>
  );
};

export default ExerciseChart;
