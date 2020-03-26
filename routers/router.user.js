const express = require('express');
const { check } = require('express-validator');
const { controllerUser } = require('../controllers');

const routerUser = express.Router();

routerUser.post('/', [
  check('username', 'Username is required').not().isEmpty(),
  check('password', "Please enter a password with 6 or more characters").isLength({ min: 6 })
], controllerUser.registerUser);

module.exports = routerUser;
