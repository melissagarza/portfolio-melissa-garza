import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadExercise,
  loadExercises,
  loadExerciseFocus
} from '../../actions/exercise';
import {
  Form,
  ButtonGroup,
  ToggleButton,
  Col
} from 'react-bootstrap';

const ExerciseForm = () => {

  const dispatch = useDispatch();

  const {
    loading,
    exercise, 
    exerciseNames
  } = useSelector(state => state.exercise);

  useEffect(() => {
    if (!loading && exercise === '' && exerciseNames && exerciseNames.length > 0) {
      dispatch(loadExercise(exerciseNames[0]));
      dispatch(loadExercises({ name: exerciseNames[0] }));
      dispatch(loadExerciseFocus('volume'));
    }
  }, [dispatch, loading, exercise, exerciseNames]);

  const focusSelection = ['volume', 'reps'];

  const onChangeSelectExercise = e => {
    dispatch(loadExercise(e.target.value));
    dispatch(loadExercises({ name: e.target.value }));
  };

  const onChangeExerciseFocus = e => {
    dispatch(loadExerciseFocus(e.target.value));
    dispatch(loadExercise(exercise));
    dispatch(loadExercises({ name: exercise }));
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

export default ExerciseForm;
