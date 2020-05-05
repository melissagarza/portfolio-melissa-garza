import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadWorkoutHistory } from '../../actions/exercise';
import { Form, Button } from 'react-bootstrap';

const ExerciseUpload = ({ uploadWorkoutHistory }) => {

  const [file, setFile] = useState(null);

  const uploadFile = e => {
    e.preventDefault();
    uploadWorkoutHistory(file);
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
        >
          Upload
        </Button>
      </Form>
    </Fragment>
  );
};

ExerciseUpload.propTypes = {
  uploadWorkoutHistory: PropTypes.func.isRequired
};

export default connect(null, { uploadWorkoutHistory })(ExerciseUpload);
