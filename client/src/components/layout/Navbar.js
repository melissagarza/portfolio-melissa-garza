import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
              <div className="buttons">
                <Link to="/" className="button is-primary">
                  <strong>Sign up</strong>
                </Link>
                <Link to="/" className="button is-light">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;
