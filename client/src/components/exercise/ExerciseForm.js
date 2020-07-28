import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  loadExercise,
  loadExercises,
  loadExerciseFocus
} from '../../actions/exercise';
import { connect } from 'react-redux';
import {
  Form,
  ButtonGroup,
  ToggleButton,
  Col
} from 'react-bootstrap';

const ExerciseForm = ({
  exercise: {
    exercise,
    exerciseFocus,
    exerciseNames,
    loading
  },
  loadExercise,
  loadExercises,
  loadExerciseFocus
}) => {

  useEffect(() => {
    if (!loading && exercise === '' && exerciseNames && exerciseNames.length > 0) {
      loadExercise(exerciseNames[0]);
      loadExercises({ name: exerciseNames[0] });
      loadExerciseFocus('volume');
    }
  }, [
    loading,
    exercise,
    exerciseNames,
    loadExercise,
    loadExercises,
    loadExerciseFocus
  ]);

  const focusSelection = ['volume', 'reps'];

  const onChangeSelectExercise = e => {
    loadExercise(e.target.value);
    loadExercises({ name: e.target.value });
  };

  const onChangeExerciseFocus = e => {
    loadExerciseFocus(e.target.value);
    loadExercise(exercise);
    loadExercises({ name: exercise });
  };

  return (
    <Fragment>

      <h2>
        Select An Exercise
      </h2>

      <Form className="mb-5">
        <Form.Row>

          <Form.Group as={Col}>
            <Form.Control
              as="select"
              onChange={e => onChangeSelectExercise(e)}
              value={exercise}
            >
              {exerciseNames.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col}>
            <ButtonGroup toggle>
              {focusSelection.map((focus, i) => (
                <ToggleButton
                  key={i}
                  type="radio"
                  variant="secondary"
                  value={focus}
                  onChange={e => onChangeExerciseFocus(e)}
                >
                  {focus}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Form.Group>

        </Form.Row>
      </Form>
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
  loadExercises,
  loadExerciseFocus
})(ExerciseForm);
