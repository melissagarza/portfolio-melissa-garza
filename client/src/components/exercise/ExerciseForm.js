import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { loadExercise, loadExercises } from '../../actions/exercise';
import { connect } from 'react-redux';

const ExerciseForm = ({
  exercise: {
    exerciseNames
  },
  loadExercise,
  loadExercises
}) => {

  const onChangeSelectExercise = e => {
    loadExercise(e.target.value);
    loadExercises({ name: e.target.value });
  };

  return (
    <Fragment>
      <form>
        <div className="field">
          <label className="label">Exercise</label>
          <div className="control">
            <div className="select">
              <select onChange={e => onChangeSelectExercise(e)}>
                {exerciseNames.map((name, index) => (
                  <option
                    key={index}
                    value={name}
                  >{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
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
