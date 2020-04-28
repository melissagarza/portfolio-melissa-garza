import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

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
    <Fragment>
      <h1 className="title">Register</h1>
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
          <label className="label">Confirm Password</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
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
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in here.</Link>
      </p>
    </Fragment>
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
