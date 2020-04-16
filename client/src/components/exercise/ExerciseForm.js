import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadExercise, loadExercises } from '../../actions/exercise';
import { connect } from 'react-redux';

const ExerciseForm = ({
  exercise: {
    exercise,
    exerciseNames,
    loading
  },
  loadExercise,
  loadExercises
}) => {

  useEffect(() => {
    if (!loading && exercise === '' && exerciseNames && exerciseNames.length > 0) {
      loadExercises({ name: exerciseNames[0] });
    }
  }, [
    loading,
    exercise,
    exerciseNames,
    loadExercises
  ]);

  const onChangeSelectExercise = e => {
    loadExercise(e.target.value);
    loadExercises({ name: e.target.value });
  };

  return (
    <Fragment>
      <form>
        <fieldset disabled={loading ? 'disabled': ''}>
          <div className="field">
            <label className="label">Exercise</label>
            <div className="control">
              <div className="select">
                <select
                  onChange={e => onChangeSelectExercise(e)}
                  value={exercise}
                >
                  {exerciseNames.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </Fragment>
  );
};

ExerciseForm.propTypes = {
  exerciseNames: PropTypes.array,
  loadExercise: PropTypes.func.isRequired,
  loadExercises: PropTypes.func.isRequired
};

const mapStateToProps = ({ exercise }) => ({ exercise });

export default connect(mapStateToProps, {
  loadExercise,
  loadExercises
})(ExerciseForm);
