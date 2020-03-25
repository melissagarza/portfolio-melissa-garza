const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const { controllerAuth } = require('../controllers');

const routerAuth = express.Router();

routerAuth.get('/', auth, controllerAuth.getAuthenticatedUser);
routerAuth.post('/', [
  check('email', 'A valid email is required').isEmail(),
  check('password', 'Password is required').exists()
], controllerAuth.authenticate);

module.exports = routerAuth;
