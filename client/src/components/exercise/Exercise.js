import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadExerciseNames } from '../../actions/exercise';
import Loading from '../layout/Loading';
import ExerciseChart from './ExerciseChart';
import ExerciseForm from './ExerciseForm';

const Exercise = ({ exercise: { loading }, loadExerciseNames }) => {

  useEffect(() => {
    loadExerciseNames();
  }, [loadExerciseNames]);

  return loading ? (
    <Loading />
  ) : (
    <div className="container">
      <h1 className="mb-5">Exercise Charts</h1>
      <ExerciseForm />
      <ExerciseChart />
    </div>
  )
};

Exercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  loadExerciseNames: PropTypes.func.isRequired
};

const mapStateToProps = ({ exercise }) => ({ exercise });

export default connect(mapStateToProps, { loadExerciseNames })(Exercise);
