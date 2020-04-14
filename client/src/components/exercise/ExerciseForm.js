import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ExerciseForm = ({ exerciseNames }) => {
  return (
    <Fragment>
      <form>
        <div className="field">
          <label className="label">Exercise</label>
          <div className="control">
            <div className="select">
              <select>
                {exerciseNames.map((name, index) => (
                  <option key={index}>{name}</option>
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

};

export default ExerciseForm;
