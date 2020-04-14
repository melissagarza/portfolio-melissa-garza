import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadExerciseNames, loadExercises } from '../../actions/exercise';
import Loading from '../layout/Loading';
import ExerciseChart from './ExerciseChart';
import ExerciseForm from './ExerciseForm';

const Exercises = ({
  loadExerciseNames,
  loadExercises,
  exercise: {
    exercise,
    exerciseNames,
    exercises,
    loading
  }
}) => {

  useEffect(() => {
    loadExerciseNames();
  }, [loadExerciseNames]);

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
  loadExercises: PropTypes.func.isRequired,
  loadExerciseNames: PropTypes.func.isRequired
};

const mapStateToProps = ({ exercise }) => ({ exercise });

export default connect(mapStateToProps, {
  loadExerciseNames,
  loadExercises
})(Exercises);
