import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadExerciseNames } from '../../actions/exercise';
import Loading from '../layout/Loading';
import ExerciseChart from './ExerciseChart';
import ExerciseUpload from './ExerciseUpload';
import ExerciseForm from './ExerciseForm';

const Exercise = ({ auth: { isAuthenticated }, exercise: { loading }, loadExerciseNames }) => {

  useEffect(() => {
    loadExerciseNames();
  }, [loadExerciseNames]);

  return loading ? (
    <Loading />
  ) : (
    <div className="container">
      <h1 className="mb-5">Exercise Charts</h1>
      {isAuthenticated && <ExerciseUpload />}
      <ExerciseForm />
      <ExerciseChart />
    </div>
  )
};

Exercise.propTypes = {
  auth: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  loadExerciseNames: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, exercise }) => ({ auth, exercise });

export default connect(mapStateToProps, { loadExerciseNames })(Exercise);
