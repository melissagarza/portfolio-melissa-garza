import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExercises } from '../../actions/exercise';
import Loading from '../layout/Loading';

const Exercises = ({
  getExercises,
  exercise: {
    exercises,
    loading
  }
}) => {

  useEffect(() => {
    getExercises();
  }, [getExercises]);

  return loading || exercises === null ? (
    <Loading />
  ) : (
    <Fragment>
      <h1>Exercises</h1>
      {exercises.map(exercise => (
        <div key={exercise._id}>{exercise.name}</div>
      ))}
    </Fragment>
  )
};

Exercises.propTypes = {
  exercise: PropTypes.object.isRequired,
  getExercises: PropTypes.func.isRequired
};

const mapStateToProps = ({ exercise }) => ({ exercise });

export default connect(mapStateToProps, { getExercises })(Exercises);
