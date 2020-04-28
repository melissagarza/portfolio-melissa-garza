import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({
  auth: {
    isAuthenticated,
    user
  },
  logout
}) => {

  const onClickLogout = e => {
    e.preventDefault();
    logout();
  };

  const linksAuthenticated = (
    <Fragment>
      {user && <p>
        {`Hello, ${user.username}`}
      </p>}
      <div className="buttons">
        <button
          onClick={e => onClickLogout(e)}
          className="button is-light"
        >
          Log Out
        </button>
      </div>
    </Fragment>
  );

  const linksGuest = (
    <Fragment>
      <div className="buttons">
        <Link to="/register" className="button is-primary">
          <strong>Register</strong>
        </Link>
        <Link to="/login" className="button is-light">
          Log in
        </Link>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <h1 className="title">
              Melissa Garza's Portfolio
            </h1>
          </Link>

          <Link to="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Resume
            </Link>

            <a href="https://github.com/melissagarza" className="navbar-item" rel="noopener noreferrer" target="_blank">
              GitHub
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <Link to="/" className="navbar-link">
                Projects
              </Link>
              <div className="navbar-dropdown">
                <Link to="/exercises" className="navbar-item">
                  Exercises
                </Link>
                <Link to="/" className="navbar-item">
                  Bubble Chart
                </Link>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {isAuthenticated ? linksAuthenticated : linksGuest}
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { logout })(Navbar);
