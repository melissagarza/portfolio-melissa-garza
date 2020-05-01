import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadExercise, loadExercises } from '../../actions/exercise';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

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
    <Form className="mb-5">
      <Form.Group>
        <Form.Label>
          Exercise
        </Form.Label>
        <Form.Control
          as="select"
          onChange={e => onChangeSelectExercise(e)}
          value={exercise}
        >
          {exerciseNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </Form.Control>
        <Form.Text className="text-muted">
          Note: Calculating volume only works for certain exercises. Some exercises will show unwanted results.
        </Form.Text>
      </Form.Group>
    </Form>
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
