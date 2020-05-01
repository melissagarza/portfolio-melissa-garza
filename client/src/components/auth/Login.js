import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import { Form, Button } from 'react-bootstrap';

const Login = ({ addAlert, login, auth: { isAuthenticated } }) => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login({ username, password });
  };

  if (isAuthenticated) {
    return (
      <Redirect exact to="/" />
    );
  }

  return (
    <div className="container">
      <h1 className="mb-5">Log In</h1>
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
        <Button
          variant="primary"
          type="submit"
          className="mt-2"
        >
          Submit
        </Button>
      </Form>
      <p className="mt-2">
        Don't have an account? <Link to="/register">Register here.</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  addAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, {
  addAlert,
  login
})(Login);
