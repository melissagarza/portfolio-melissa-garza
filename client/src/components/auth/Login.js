import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAlert } from '../../actions/alert';
import { login } from '../../actions/auth';

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
    <Fragment>
      <h1 className="title">Log In</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              name="username"
              value={username}
              onChange={e => onChange(e)}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon="user" />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon="asterisk" />
            </span>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Register here.</Link>
          </p>
        </div>
      </form>
    </Fragment>
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
