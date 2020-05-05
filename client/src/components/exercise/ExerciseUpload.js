import React, { Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';

const ExerciseUpload = () => {

  const uploadFile = e => {
    e.preventDefault();
    // TODO: Create action/reducer to call API to upload workout history file
  };

  return (
    <Fragment>
      <h2>
        Upload Your Workout History
      </h2>
      <Form className="mb-5" onSubmit={e => uploadFile(e)}>
        <Form.Group>
          <Form.File></Form.File>
          <Form.Text>
          Upload your workout history to see your own chart filtered by exercise. Only .csv files accepted.
          </Form.Text>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mt-2"
        >
          Upload
        </Button>
      </Form>
    </Fragment>
  );
};

export default ExerciseUpload;
