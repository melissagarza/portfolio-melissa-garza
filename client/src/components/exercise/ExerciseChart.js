import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import { createChart } from '../../utils/chart';

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
      let chart = createChart('public', exercises);
      let exercisesUser = exercises.filter(exercise => exercise.user.alias === user.alias);
      let chartUser = createChart('user', exercisesUser);

      chart.draw();
      chartUser.draw();
    }
  }, [loading, exercises, user]);

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
