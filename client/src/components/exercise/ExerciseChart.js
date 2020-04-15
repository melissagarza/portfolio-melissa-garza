import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';

const ExerciseChart = ({ exercise: { exercise, exercises, loading } }) => {
  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      {exercise && exercise !== '' && (
        <h2>Chart for {exercise}</h2>
      )}
      {/* {exercises && exercises.length > 0 && (
        <div className="exercise-container">
          There are exercises to make a chart.
        </div>
      )} */}
    </Fragment>
  );
};

ExerciseChart.propTypes = {
  exercise: PropTypes.object,
  exercises: PropTypes.object
};

const mapStateToProps = ({ exercise }) => ({ exercise });

export default connect(mapStateToProps, {})(ExerciseChart);
