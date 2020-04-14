import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { loadExercise } from '../../actions/exercise';
import { connect } from 'react-redux';

const ExerciseForm = ({ exerciseNames, loadExercise }) => {

  return (
    <Fragment>
      <form>
        <div className="field">
          <label className="label">Exercise</label>
          <div className="control">
            <div className="select">
              <select onChange={e => loadExercise(e.target.value)}>
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
  exerciseNames: PropTypes.array.isRequired,
  loadExercise: PropTypes.func.isRequired
};

const mapStateToProps = ({ exercise }) => ({ exercise });

export default connect(mapStateToProps, { loadExercise })(ExerciseForm);
