import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  uploadWorkoutHistory,
  loadExerciseNames,
  loadExercise,
  loadExercises
} from '../../actions/exercise';
import { Form, Button } from 'react-bootstrap';

const ExerciseUpload = ({
  exercise: {
    loading
  },
  uploadWorkoutHistory,
  loadExerciseNames,
  loadExercise,
  loadExercises
}) => {

  const [file, setFile] = useState(null);

  const uploadFile = async e => {
    e.preventDefault();
    await uploadWorkoutHistory(file);
    await loadExerciseNames();
    loadExercise();
    await loadExercises();
  };

  return (
    <Fragment>
      <h2>
        Upload Your Workout History
      </h2>
      <Form className="mb-5" onSubmit={e => uploadFile(e)}>
        <Form.Group>
          <Form.File>
            <Form.File.Input
              onChange={e => setFile(e.target.files[0])}
            ></Form.File.Input>
            <Form.Text>
              Upload your workout history to see your own chart filtered by exercise. Only .csv files accepted.
            </Form.Text>
          </Form.File>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={e => uploadFile(e)}
          className="mt-2"
          disabled={loading ? 'disabled' : ''}
        >
          Upload
        </Button>
      </Form>
    </Fragment>
  );
};

ExerciseUpload.propTypes = {
  exercise: PropTypes.object.isRequired,
  uploadWorkoutHistory: PropTypes.func.isRequired,
  loadExerciseNames: PropTypes.func.isRequired,
  loadExercise: PropTypes.func.isRequired,
  loadExercises: PropTypes.func.isRequired
};

const mapStateToProps = ({ exercise }) => ({ exercise });

export default connect(mapStateToProps, {
  uploadWorkoutHistory,
  loadExerciseNames,
  loadExercise,
  loadExercises
})(ExerciseUpload);
