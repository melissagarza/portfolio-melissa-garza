import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Form, Button } from 'react-bootstrap';

const Register = ({ addAlert, register, auth: { isAuthenticated } }) => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: ''
  });

  const { username, password, passwordConfirm } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      addAlert('Passwords do not match', 'danger');
    } else {
      register({ username, password });
    }
  };

  if (isAuthenticated) {
    return (
      <Redirect exact to="/" />
    );
  }

  return (
    <div className="container">
      <h1 className="mb-5">Register</h1>
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group>
          <Form.Label>
            <FontAwesomeIcon icon="user" className="mr-2" />
            Username
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <FontAwesomeIcon icon="asterisk" className="mr-2" />
            Password
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <FontAwesomeIcon icon="asterisk" className="mr-2" />
            Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mt-2"
        >
          Submit
        </Button>
      </Form>
      <p className="mt-2">
        Already have an account? <Link to="/login">Log in here.</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  addAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, {
  addAlert,
  register
})(Register);
