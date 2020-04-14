import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExercises, getExerciseNames } from '../../actions/exercise';
import Loading from '../layout/Loading';
import ExerciseChart from './ExerciseChart';
import ExerciseForm from './ExerciseForm';

const Exercises = ({
  getExercises,
  getExerciseNames,
  exercise: {
    exercises,
    exerciseNames,
    loading
  }
}) => {

  useEffect(() => {
    getExercises();
    getExerciseNames();
  }, [getExercises, getExerciseNames]);

  return loading || exercises === null || exerciseNames === null ? (
    <Loading />
  ) : (
    <Fragment>
      <h1>Exercises</h1>
      <ExerciseChart />
      <ExerciseForm
        exerciseNames={exerciseNames}
      />
    </Fragment>
  )
};

Exercises.propTypes = {
  exercise: PropTypes.object.isRequired,
  getExercises: PropTypes.func.isRequired,
  getExerciseNames: PropTypes.func.isRequired
};

const mapStateToProps = ({ exercise }) => ({ exercise });

export default connect(mapStateToProps, {
  getExercises,
  getExerciseNames
})(Exercises);
