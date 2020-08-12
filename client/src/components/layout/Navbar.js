import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Nav,
  NavDropdown,
  Navbar as NavbarBS
} from 'react-bootstrap';

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
      <Nav.Item>
        {user && <span>
          {`Hello, ${user.username}`}
        </span>}
        <Button
          onClick={e => onClickLogout(e)}
          className="ml-4"
        >
          Log Out
        </Button>
      </Nav.Item>
    </Fragment>
  );
  const linksGuest = (
    <Fragment>
      <Nav.Item>
        <LinkContainer to="/register">
          <Nav.Link>
              Register
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/login">
          <Nav.Link>
              Log In
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Fragment>
  );

  return (
    <NavbarBS>
      <NavbarBS.Brand href="/">Melissa Garza's Portfolio</NavbarBS.Brand>
      <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
      <NavbarBS.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/resume">
            <Nav.Link>
              Resume
            </Nav.Link>
          </LinkContainer>
          <Nav.Link href="https://github.com/melissagarza" rel="noopener noreferrer" target="_blank">
            GitHub
          </Nav.Link>
          <NavDropdown title="Projects">
            <NavDropdown.Item href="/exercises">
              Exercises
            </NavDropdown.Item>
            <NavDropdown.Item href="/roadmap">
              Roadmap
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="justify-content-end">
          {isAuthenticated ? linksAuthenticated : linksGuest}
        </Nav>
      </NavbarBS.Collapse>
    </NavbarBS>
  );
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { logout })(Navbar);
